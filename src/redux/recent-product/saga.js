import { addRecentProductService, removeRecentProductService,  getRecentProductsService } from './services'
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
function* getRecentProducts(action) {
  // const { idCart } = action.payload
  try {
    yield put({
      type: Actions.GET_RECENT_PRODUCTS_START,
    })
    const querySnapshot = yield call(getRecentProductsService, action.payload)
    const temp = []
    // console.log(querySnapshot._docs,'doc');
    for (const doc of querySnapshot._docs) {
      if (doc._exists) {
        if (doc._data.available == 'true') {
          temp.push(doc._data)
        }
      }
    }
    const temp2 = []
    if (temp.length > 0) {
      const querySnapshot2 = yield call(getProductIdIn, temp.map((item, index) => item.id))

      for (const doc of querySnapshot2._docs) {
        // kiêm tra sản phẩm có sẵn hay không
        if (doc._data.available == 'true') {
          temp2.push(doc._data)
        }
      }

      yield put({
        type: Actions.GET_RECENT_PRODUCTS_SUCCESS,
        payload: temp2
      })
    } else {
      yield put({
        type: Actions.GET_RECENT_PRODUCTS_SUCCESS,
        payload: []
      })
    }
    

    // console.log(temp, 'temp');
  } catch (error) {
    yield put({
      type: Actions.GET_RECENT_PRODUCTS_FAIL,
      payload: "Vui lòng kiểm tra internet và thử lại."
    })
  }
}

function* addRecentProduct(action) {
  try {
    const { payload } = action
    yield call(addRecentProductService, payload.uid, payload.product)
    yield put({
      type: Actions.GET_RECENT_PRODUCTS,
      payload: payload.uid
    })

  } catch (error) {
    console.log(error, 'recent saga');
  }
}

function* removeRecentProduct(action) {
  try {
    const { payload } = action
    const {uid, pid} = payload
    yield call(removeRecentProductService, uid, pid)
    yield put({
      type: Actions.GET_RECENT_PRODUCTS,
      payload: payload.uid
    })

  } catch (error) {
    console.log(error, 'recent remove saga');
  }
}

export default function* recentSaga() {
  yield takeEvery(Actions.GET_RECENT_PRODUCTS, getRecentProducts);
  yield takeEvery(Actions.ADD_RECENT_PRODUCT, addRecentProduct);
  yield takeEvery(Actions.REMOVE_RECENT_PRODUCT, removeRecentProduct);

}

