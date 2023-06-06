import {all} from 'redux-saga/effects';

import authSaga from './redux/auth/saga';





/**
 * Root saga
 * @returns {IterableIterator<AllEffect | GenericAllEffect<any> | *>}
 */
export default function* rootSagas() {
  yield all([
    authSaga(),
  ]);
}
