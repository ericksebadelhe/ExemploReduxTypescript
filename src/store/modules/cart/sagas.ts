import { AxiosResponse } from 'axios';
import { all, call, select, spawn, take, takeLatest, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as NetInfo from '@react-native-community/netinfo';
import { OFFLINE, ONLINE } from 'redux-offline-queue';
import { IState } from '../..';
import api from '../../../services/api';
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
  finishShopping
} from './actions';
import { ActionTypes } from './types';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;
type FinishShoppingRequest = ReturnType<typeof finishShopping>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
  });

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

function* handleExecuteFinishShopping({ payload }: FinishShoppingRequest) {
  const { items } = payload;

  const buyingProducts = items.map(item => ({
    id: item.product.id,
    title: item.product.title,
    quantity: item.quantity,
    total: (item.quantity * item.product.price).toFixed(2)
  }));

  try {
    yield call(api.post, 'carts', buyingProducts);
    console.log('Finalizou a compra!');
  } catch (err) {
    console.log(err, 'ERRO!');
  }
}

export function* startWatchingNetworkConnectivity() {

  const channel = eventChannel(emitter => {
    const status = NetInfo.addEventListener((state) => {
      emitter(state.isConnected);
    });

    return status;
  });


  try {
    while (true) {
      const isConnected = yield take(channel);

      if (isConnected) {
        yield put({ type: ONLINE })
      } else {
        yield put({ type: OFFLINE })
      }
    }
  } finally {
    console.log('FINALLY')
    channel.close();
  }
}

export default all([
  spawn(startWatchingNetworkConnectivity),
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
  takeLatest(ActionTypes.finishShopping, handleExecuteFinishShopping)
]);