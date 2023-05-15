
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
import { getUser, createUser, updateAddress, updateName, updateGender, updatePhone, updateBirthday,updateAvatar } from './services'


import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call, select, takeEvery } from 'redux-saga/effects';
// import { connect } from 'react-redux';
// import { showMessage } from 'react-native-flash-message';

import * as Actions from './constants';

// import NavigationService from 'src/utils/navigation';


export const saveUser = (user) => {
  AsyncStorage.setItem('@user', JSON.stringify(user))
}

export const getUserLocal =async () => {
  const value = await AsyncStorage.getItem('@user')
  if(value != null){
    return JSON.parse(value);
  }
  return null;
}

export const deleteUser = () => {
  AsyncStorage.removeItem('@user')
}
/**
 * Sign out
 * @returns {Promise<void>}
 */
async function signOut() {

}
/**
 * Sign In saga
 * @param username
 * @param password
 * @returns {IterableIterator<*>}
 */
function* signInWithEmailSaga(action) {
  const { email, password } = action.payload
  try {
    yield put({
      type: Actions.LOGIN_LOADING,
    })
    const data = yield call([auth(), 'signInWithEmailAndPassword'], email, password)
    // get user thật
    const user = yield call(getUser, data.user.uid)
    console.log(user);
    yield put({
      type: Actions.LOGIN_SUCESS,
      payload: user._data
    })
    yield call(saveUser,user._data)
  } catch (error) {
    if (error.code == 'auth/user-not-found') {
      yield put({
        type: Actions.LOGIN_FAIL,
        payload: 'Email chưa được đăng kí'
      })
      return;
    }

    if (error.code == 'auth/wrong-password') {
      yield put({
        type: Actions.LOGIN_FAIL,
        payload: 'Sai mật khẩu'
      })
      return;
    }
    if (error.code == 'auth/too-many-requests') {
      yield put({
        type: Actions.LOGIN_FAIL,
        payload: 'Bạn đã cố gắng đăng nhập quá nhiều lần, vui lòng thử lại sau.'
      })
      return;
    }

    yield put({
      type: Actions.LOGIN_FAIL,
      payload: 'Vui lòng thử lại.'
    })
    return;
  }
}


function* signUpWithEmailSaga(action) {
  const { email, password, name } = action.payload
  try {
    yield put({
      type: Actions.SIGNUP_LOADING,
    })
    const data = yield call([auth(), 'createUserWithEmailAndPassword'], email, password)
    // tạo user thật
    console.log(data);
    const jsonUser = {
      birthDay: "",
      email,
      gender: "",
      id: data.user.uid,
      name,
      urlAvt: "https://vi-magento.com/wp-content/uploads/2020/09/ASSET-USER-ADMIN.png",
      address: "",
      role:0
    }

    yield call(createUser, data.user.uid, jsonUser)
    // get user thật
    const user = yield call(getUser, data.user.uid)
    // console.log(user,'user');

    yield put({
      type: Actions.SIGNUP_SUCESS,
      payload: user._data
    })
    yield call(saveUser,user._data)
  } catch (error) {
    console.log(error);
    if (error.code == 'auth/email-already-in-use') {
      yield put({
        type: Actions.SIGNUP_FAIL,
        payload: 'Email đã được sử dụng.'
      })
      return;
    }

    if (error.code == 'auth/invalid-email') {
      yield put({
        type: Actions.SIGNUP_FAIL,
        payload: 'Email không hợp lệ.'
      })
      return;
    }

    yield put({
      type: Actions.SIGNUP_FAIL,
      payload: 'Vui lòng thử lại.'
    })
    return;
  }
}

function* signInWithLocalSaga(){
  try {
    yield put({
      type: Actions.TRY_LOGIN_LOCAL_START
    })
    const data = yield call(getUserLocal)
    if(data != null){
      yield put({
        type: Actions.LOGIN_SUCESS,
        payload: data
      })
    }
    console.log(data);
    
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: Actions.TRY_LOGIN_LOCAL_END,
  })
}

function* logoutSaga(){
  
  try {
    yield call(deleteUser)
    yield put({
      type: Actions.LOGOUT_SUCCESS,
    })
    console.log("logout");
  } catch (error) {
    console.log(error);
  }
}

function* getUserSaga(action){
  const {payload} = action
  
  try {
     // get user thật
     const user = yield call(getUser, payload)
     yield put({
       type: Actions.LOGIN_SUCESS,
       payload: user._data
     })
     yield call(deleteUser)
     yield call(saveUser,user._data)
  } catch (error) {
    console.log(error);
  }
}

function* updateAddressSaga(action){
  const {payload} = action
  try {
     yield call(updateAddress, payload.uid, payload.address)
     yield put({
       type: Actions.GET_USER,
       payload: payload.uid
     })
  } catch (error) {
    console.log(error);
  }
}

function* updateNameSaga(action){
  const {payload} = action
  try {
     yield call(updateName, payload.uid, payload.name)
     yield put({
       type: Actions.GET_USER,
       payload: payload.uid
     })
  } catch (error) {
    console.log(error);
  }
}

function* updatePhoneSaga(action){
  const {payload} = action
  try {
     yield call(updatePhone, payload.uid, payload.phone)
     yield put({
       type: Actions.GET_USER,
       payload: payload.uid
     })
  } catch (error) {
    console.log(error);
  }
}

function* updateGenderSaga(action){
  const {payload} = action
  try {
     yield call(updateGender, payload.uid, payload.gender)
     yield put({
       type: Actions.GET_USER,
       payload: payload.uid
     })
  } catch (error) {
    console.log(error);
  }
}
function* updateBirthdaySaga(action){
  const {payload} = action
  try {
     yield call(updateBirthday, payload.uid, payload.birthday)
     yield put({
       type: Actions.GET_USER,
       payload: payload.uid
     })
  } catch (error) {
    console.log(error);
  }
}
function* updateAvatarSaga(action){
  const {payload} = action
  console.log("doooo");
  try {
     yield call(updateAvatar, payload.uid, payload.urlAvt)
     yield put({
       type: Actions.GET_USER,
       payload: payload.uid
     })
  } catch (error) {
    console.log(error);
  }
}


export default function* authSaga() {
  yield takeEvery(Actions.LOGIN, signInWithEmailSaga);
  yield takeEvery(Actions.SIGNUP, signUpWithEmailSaga);
  yield takeEvery(Actions.TRY_LOGIN_LOCAL, signInWithLocalSaga);
  yield takeEvery(Actions.LOGOUT, logoutSaga);
  yield takeEvery(Actions.GET_USER, getUserSaga);
  yield takeEvery(Actions.UPDATE_ADDRESS, updateAddressSaga);
  yield takeEvery(Actions.UPDATE_NAME, updateNameSaga);
  yield takeEvery(Actions.UPDATE_GENDER, updateGenderSaga);
  yield takeEvery(Actions.UPDATE_PHONE, updatePhoneSaga);
  yield takeEvery(Actions.UPDATE_BIRTHDAY, updateBirthdaySaga);
  yield takeEvery(Actions.UPDATE_URLAVT, updateAvatarSaga);
}

