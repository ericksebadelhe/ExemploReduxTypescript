import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import "./config/reactotron";
import { PersistGate } from 'redux-persist/integration/react';
import { NetworkProvider } from 'react-native-offline';

import { persistor, store } from './store';

import Cart from './components/Cart';
import Catalog from './components/Catalog';
import NetworkInfo from './components/NetworkInfo';
import NetInfo from '@react-native-community/netinfo';

NetInfo.addEventListener(state => console.log(state.isConnected));

const App = () => {
  return (
    <>
      <NetworkProvider>
        <StatusBar barStyle="light-content" backgroundColor="#000" translucent />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Catalog />
            <Cart />
            <NetworkInfo />
          </PersistGate>
        </Provider>
      </NetworkProvider>
    </>
  );
};


export default App;
