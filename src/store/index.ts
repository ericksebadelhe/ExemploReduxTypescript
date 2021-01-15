import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { persistStore, persistReducer, REHYDRATE } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue'

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

import { ICartState } from './modules/cart/types';

export interface IState {
  cart: ICartState;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const middlewares = [];

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

// const networkMiddleware = createNetworkMiddleware({
//   queueReleaseThrottle: 200,
// });

// middlewares.push(networkMiddleware);
middlewares.push(offlineMiddleware({ additionalTriggers: REHYDRATE }));
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());
// middlewares.push(sagaMiddleware);

const store = createStore(
  persistedReducer,
  compose(
    console.tron.createEnhancer(),
    applyMiddleware(...middlewares),
  ),
);

// HABILITAR EM PRODUÇÃO ===========================================
// const store = createStore(
//   persistedReducer,
//   applyMiddleware(...middlewares),
// );

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };