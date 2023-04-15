import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store';
import ListItemDetail from '../components/ListItemDetails';

export default function ProductDetailScreen() {
  const item = useSelector((state: RootState) => state.product.currentProduct);

  return (
    <ListItemDetail item={item} />
  );
}
