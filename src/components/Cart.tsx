import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';
import { finishShopping } from '../store/modules/cart/actions';
import { ICartItem } from '../store/modules/cart/types';

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);

  const handleFinishShopping = useCallback((items: ICartItem[]) => {
    dispatch(finishShopping(items))
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.labels}>Produto</Text>
        <Text style={styles.labels}>Preço</Text>
        <Text style={styles.labels}>Quantidade</Text>
        <Text style={styles.labels}>Total</Text>
      </View>
      <View style={styles.content}>
        {cart.map(item => {
          return (
            <View style={styles.item} key={item.product.id}>
              <Text style={styles.text}>{item.product.title}</Text>
              <Text style={styles.price}>{item.product.price}</Text>
              <Text style={styles.text}>{item.quantity}</Text>
              <Text style={styles.price}>{(item.product.price * item.quantity).toFixed(2)}</Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleFinishShopping(cart)}>
        <Text style={styles.buttonText}>Finalizar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labels: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#FFF',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
    marginTop: 32,
    backgroundColor: '#7030A0',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})

export default Cart;