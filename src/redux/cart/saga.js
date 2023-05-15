import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { getCarts as getCarts2, updateCart as updateCartServices, clearCart as clearCartServices, getProductIdIn, getProductById } from './services'


import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call, select, takeEvery } from 'redux-saga/effects';
// import { connect } from 'react-redux';
// import { showMessage } from 'react-native-flash-message';

import * as Actions from './constants';
import { showMessage } from 'react-native-flash-message';
import { StatusBar } from 'react-native';


/**
 * @returns {IterableIterator<*>}
 */
function* getCarts(action) {
  // const { idCart } = action.payload
  try {
    yield put({
      type: Actions.GET_CART_START,
    })
    const querySnapshot = yield call(getCarts2, action.payload)
    let temp = []
    let totalAmount = 0;
    let numberOfProduct = 0;
    // lấy cart từ host
    if (querySnapshot._exists) {

      for (const doc of querySnapshot._data?.items) {
        temp.push(doc)
        // totalAmount += doc.price * doc.quantity
        // numberOfProduct += doc.quantity
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
          temp2.push(doc)
        }
      }
    // }
    temp = []
    // lọc phần tử giống nhau 2 mảng
    if (querySnapshot._exists) {

      for (const doc of querySnapshot._data?.items) {
        if (temp2.find((e => e.id == doc.id))) {
          temp.push(doc)
          totalAmount += doc.price * doc.quantity
          numberOfProduct += doc.quantity
        }
      }
    }
    }

    yield put({
      type: Actions.GET_CART_SUCCESS,
      payload: { cart: temp, totalAmount, numberOfProduct }
    })
  } catch (error) {
    yield put({
      type: Actions.GET_CART_SUCCESS,
      payload: { cart: [], totalAmount: 0, numberOfProduct: 0 }
    })
    console.log(error);
  }
}

function* getCartsNoShowLoading(action) {
  // const { idCart } = action.payload
  try {
   
    const querySnapshot = yield call(getCarts2, action.payload)
    let temp = []
    let totalAmount = 0;
    let numberOfProduct = 0;
    // lấy cart từ host
    if (querySnapshot._exists) {

      for (const doc of querySnapshot._data?.items) {
        temp.push(doc)
        // totalAmount += doc.price * doc.quantity
        // numberOfProduct += doc.quantity
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
    // }
    temp = []
    // lọc phần tử giống nhau 2 mảng
    if (querySnapshot._exists) {

      for (const doc of querySnapshot._data?.items) {
        if (temp2.find((e => e.id == doc.id))) {
          temp.push(doc)
          totalAmount += doc.price * doc.quantity
          numberOfProduct += doc.quantity
        }
      }
    }
    }

    yield put({
      type: Actions.GET_CART_SUCCESS,
      payload: { cart: temp, totalAmount, numberOfProduct }
    })
  } catch (error) {
    yield put({
      type: Actions.GET_CART_SUCCESS,
      payload: { cart: [], totalAmount: 0, numberOfProduct: 0 }
    })
    console.log(error);
  }
}

export function* addToCart(action) {
  const { payload } = action
  const { oldCart, id, product } = payload
  try {
    yield put({
      type: Actions.ADD_TO_CART_START,
    })

    // kiem tra sản phẩm còn hay không
    const querySnapshot = yield call(getProductById, product.id)
    console.log(querySnapshot);

    if (querySnapshot._data.available) {
      let exist = false;
      // if(ex)
      const newCart = oldCart.map((value) => {
        if (value.id == product.id) {
          exist = true
          return { ...value, quantity: value.quantity + 1 }
        }
        return value
      })
      if (!exist) newCart.push({ ...product, quantity: 1 })

      yield call(updateCartServices, id, newCart)

      yield call(getCarts, { payload: id })
    } else {
      console.log("loi");
      yield call(showMessage, {
        message: 'Sản phẩm có sẵn vui lòng chọn sản phẩm khác!',
        type: 'warning',
        position: { top: StatusBar.currentHeight, left: 0 },
      });
    }
    yield put({
      type: Actions.ADD_TO_CART_SUCCESS,
    })

  } catch (error) {
    console.log(error);
    yield put({
      type: Actions.ADD_TO_CART_SUCCESS,
    })
  }
}
export function* updateCart(action) {
  const { payload } = action
  const { newCart, id } = payload
  try {

    yield call(updateCartServices, id, newCart)
    yield call(getCartsNoShowLoading, { payload: id })
  } catch (error) {
    console.log(error,'update cart saga');
  }
}

export function* clearCart(action) {
  const { payload } = action
  try {
    yield call(clearCartServices, payload)
    yield call(getCartsNoShowLoading, { payload: payload })
  } catch (error) {

  }
}


export default function* cartSaga() {
  yield takeEvery(Actions.GET_CART, getCarts);
  yield takeEvery(Actions.ADD_TO_CART, addToCart);
  yield takeEvery(Actions.UPDATE_CART, updateCart);
  yield takeEvery(Actions.CLEAR_CART, clearCart);


}

