import { addFavoriteProductService, removeFavoriteProductService, getFavoriteProductsService } from './services'
import { put, call, select, takeEvery } from 'redux-saga/effects';
import * as Actions from './constants';
import * as ActionsCart from '../cart/constants';
import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message';
import * as RootNavigation from '../../uitls/naviation';
import { StatusBar } from 'react-native';
import { getProductIdIn } from '../cart/services';
/**
 * @returns {IterableIterator<*>}
 */
function* getFavoriteProducts(action) {
  // const { idCart } = action.payload
  try {
    yield put({
      type: Actions.GET_FAVORITE_PRODUCTS_START,
    })
    const querySnapshot = yield call(getFavoriteProductsService, action.payload)
    const temp = []
    // console.log(querySnapshot._docs,'doc');
    for (const doc of querySnapshot._docs) {
      if (doc._exists) {
        if (doc._data.available == 'true') {
          temp.push(doc._data)
        }
      }
    }

    // Lấy sp theo id
    const temp2 = []
    if (temp.length > 0) {
      const querySnapshot2 = yield call(getProductIdIn, temp.map((item, index) => item.id))

      // console.log(querySnapshot2._docs);
      // if (querySnapshot2._exists) {
      for (const doc of querySnapshot2._docs) {
        // kiêm tra sản phẩm có sẵn hay không
        if (doc._data.available == 'true') {
          temp2.push(doc._data)
        }
      }

      yield put({
        type: Actions.GET_FAVORITE_PRODUCTS_SUCCESS,
        payload: temp2
      })
    } else {
      yield put({
        type: Actions.GET_FAVORITE_PRODUCTS_SUCCESS,
        payload: []
      })
    }
    // console.log(temp, 'temp');
  } catch (error) {
    yield put({
      type: Actions.GET_FAVORITE_PRODUCTS_FAIL,
      payload: "Vui lòng kiểm tra internet và thử lại."
    })
  }
}

function* addFavoriteProduct(action) {
  try {
    const { payload } = action
    yield call(addFavoriteProductService, payload.uid, payload.data)
    yield put({
      type: Actions.GET_FAVORITE_PRODUCTS,
      payload: payload.uid
    })

  } catch (error) {
    console.log(error, 'favorite saga');
  }
}

function* removeFavoriteProduct(action) {
  try {
    const { payload } = action
    const { uid, pid } = payload
    yield call(removeFavoriteProductService, uid, pid)
    yield put({
      type: Actions.GET_FAVORITE_PRODUCTS,
      payload: payload.uid
    })

  } catch (error) {
    console.log(error, 'favorite remove saga');
  }
}

export default function* favoriteSaga() {
  yield takeEvery(Actions.GET_FAVORITE_PRODUCTS, getFavoriteProducts);
  yield takeEvery(Actions.ADD_FAVORITE_PRODUCT, addFavoriteProduct);
  yield takeEvery(Actions.REMOVE_FAVORITE_PRODUCT, removeFavoriteProduct);

}

