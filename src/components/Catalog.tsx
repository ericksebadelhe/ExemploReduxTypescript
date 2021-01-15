import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import api from '../services/api';
import { IProduct } from '../store/modules/cart/types';
import CatalogItem from './CatalogItem';

const Catalog = () => {
  
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('products').then(response => {
      setCatalog(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      {catalog.map(product => (
        <CatalogItem key={product.id} product={product} />
      ))}
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
});

export default Catalog;
