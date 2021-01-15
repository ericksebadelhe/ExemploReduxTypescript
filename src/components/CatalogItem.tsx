import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../store/modules/cart/types';
import { addProductToCartRequest, removeProductToCart } from '../store/modules/cart/actions';
import { IState } from '../store';

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failedStockCheck.includes(product.id);
  });
  
  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  const handleRemoveProductToCart = useCallback(() => {
    dispatch(removeProductToCart(product));
  }, [dispatch, product]);

  return (  
    <View style={styles.product}>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddProductToCart}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRemoveProductToCart}>
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>

      {hasFailedStockCheck && <Text style={styles.error}>Falta de Estoque!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#000',
  },
  product: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    color: '#FFF',
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
    backgroundColor: '#7030A0',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  error: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#F00',
  }
});

export default CatalogItem;
