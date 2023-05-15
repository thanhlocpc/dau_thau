import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers';
import rootSaga from './sagas';


// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
rootReducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)

export default store;