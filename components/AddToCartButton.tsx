import { Product } from '../database/db';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { addProductToCart, removeProductFromCart } from '../redux/productSlice';

export default function AddToCartButton({ item }: { item: Product }) {
  const [added, setAdded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);

  useEffect(() => {
    if (cart.hasOwnProperty(item.id)) {
      setAdded(true);
    }
  }, [])

  const handleOnPressed = () => {
    if (added) {
      dispatch(removeProductFromCart(item.id));
      setAdded(false);
    } else {
      dispatch(addProductToCart(item));
      setAdded(true);
    }
  }

  return (
    <Button onPress={handleOnPressed}>
      {added ? 'Remove From Cart' : 'Add To Cart'}
    </Button>
  );
}
