import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NetworkConsumer } from 'react-native-offline';

const NetworkInfo: React.FC = () => {
  return (
    <NetworkConsumer>
      {({ isConnected }) => (
        isConnected ? (
          <></>
        ) : (
            <View style={styles.container}>
              <Text style={styles.noConnection}>No Connection</Text>
            </View>
          )
      )}
    </NetworkConsumer >
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: '100%',
    paddingLeft: 16,
    backgroundColor: '#272727'
  },
  connection: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  noConnection: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F00',
  },
});

export default NetworkInfo;