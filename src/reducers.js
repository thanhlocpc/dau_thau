import { combineReducers } from 'redux';

import commonReducer from './redux/common/reducer';
import authReducer from './redux/auth/reducer';
import cartReducer from './redux/cart/reducer';
import orderReducer from './redux/order/reducer';
import recentProductReducer from './redux/recent-product/reducer';
import favoriteProductReducer from './redux/favorite-product/reducer';





/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  common: commonReducer,
  order: orderReducer,
  favorite:favoriteProductReducer,
  recent:recentProductReducer
});

export default rootReducers;
