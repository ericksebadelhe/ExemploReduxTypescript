import { all } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';

import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([
    cart,
    networkSaga,
  ]);
}