import {all} from 'redux-saga/effects';

import authSaga from './redux/auth/saga';
import cartSaga from './redux/cart/saga';
import orderSaga from './redux/order/saga';
import recentSaga from './redux/recent-product/saga';
import favoriteSaga from './redux/favorite-product/saga';





/**
 * Root saga
 * @returns {IterableIterator<AllEffect | GenericAllEffect<any> | *>}
 */
export default function* rootSagas() {
  yield all([
    authSaga(),
    cartSaga(),
    orderSaga(),
    favoriteSaga(),
    recentSaga()
  ]);
}
