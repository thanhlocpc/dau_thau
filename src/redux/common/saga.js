import { createOrder as createOrderServices, getOrders as getOrdersServices } from './services'
import { put, call, select, takeEvery } from 'redux-saga/effects';
import * as Actions from './constants';
import * as ActionsCart from '../cart/constants';
import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message';
import * as RootNavigation from '../../uitls/naviation';
import { StatusBar } from 'react-native';
/**
 * @returns {IterableIterator<*>}
 */
function* getOrders(action) {
  // const { idCart } = action.payload
  try {
    yield put({
      type: Actions.GET_ORDERS_START,
    })
    const querySnapshot = yield call(getOrdersServices, action.payload)
    const temp = []

    // console.log(querySnapshot._docs,'doc');
    for (const doc of querySnapshot._docs) {
      if (doc._exists) {
        temp.push(doc._data)
      }
    }
    yield put({
      type: Actions.GET_ORDERS_SUCCESS,
      payload: { order: temp }
    })

    // console.log(temp, 'temp');
  } catch (error) {

  }
}
function* getOrdersNoShowLoading(action) {
  // const { idCart } = action.payload
  try {
    const querySnapshot = yield call(getOrdersServices, action.payload)
    const temp = []

    // console.log(querySnapshot._docs,'doc');
    for (const doc of querySnapshot._docs) {
      if (doc._exists) {
        temp.push(doc._data)
      }
    }
    yield put({
      type: Actions.GET_ORDERS_SUCCESS,
      payload: { order: temp }
    })

    // console.log(temp, 'temp');
  } catch (error) {

  }
}

function* createOrder(action) {
  try {
    yield put({
      type: Actions.CREATE_ORDER_START
    })
    const { payload } = action
    const data = {
      ...payload.order,
      createdAt: firestore.Timestamp.now()
    }
    yield call(createOrderServices, payload.id, data)
    yield call(getOrdersNoShowLoading, { payload: payload.id })
    yield call(RootNavigation.navigate, 'order')
    yield call(showMessage, {
      message: 'Đặt hàng thành công',
      type: 'success',
      // backgroundColor:'red',
      position:{top:StatusBar.currentHeight,left:0},
    });

    yield put({
      type: ActionsCart.CLEAR_CART,
      payload: payload.id
    })
    yield put({
      type: Actions.CREATE_ORDER_SUCCESS
    })

  } catch (error) {
    console.log(error, 'order saga');
  }
}

export default function* orderSaga() {
  yield takeEvery(Actions.GET_ORDERS, getOrders);
  yield takeEvery(Actions.CREATE_ORDER, createOrder);
  yield takeEvery(Actions.GET_ORDERS_NO_SHOW_LOADING, getOrdersNoShowLoading);

}

