import { combineReducers } from 'redux';
import { reducer as offline } from 'redux-offline-queue';

import cart from './cart/reducer';

export default combineReducers({
  offline,
  cart,
});