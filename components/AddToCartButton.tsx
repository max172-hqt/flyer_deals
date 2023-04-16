import { dbAddToCart, dbRemoveFromCart } from '../database/db';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { addProductToCart, removeProductFromCart } from '../redux/userSlice';
import type { Product } from '../types';

export default function AddToCartButton({ item }: { item: Product }) {
  const [added, setAdded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state: RootState) => state.user);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user && item.id in cart) {
      setAdded(true);
    }
  }, [user, cart]);

  // sync with db
  const addCartItem = async () => {
    if (!user) {
      return;
    }

    try {
      const refId = await dbAddToCart(user, item);
      dispatch(
        addProductToCart({
          id: item.id,
          cartItem: { ...item, firebaseRefId: refId, done: false },
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeCartItem = async () => {
    if (!user) {
      return;
    }

    try {
      await dbRemoveFromCart(cart[item.id].firebaseRefId);
      dispatch(removeProductFromCart(item.id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnPressed = async () => {
    setLoading(true);
    if (added) {
      await removeCartItem();
      setAdded(false);
    } else {
      await addCartItem();
      setAdded(true);
    }
    setLoading(false);
  };

  if (!user) {
    return null;
  }

  return (
    <Button
      onPress={handleOnPressed}
      isLoading={isLoading}
      isLoadingText={added ? 'Removing' : 'Adding'}
      variant={added ? 'solid' : 'outline'}
    >
      {added ? 'Remove From Cart' : 'Add To Cart'}
    </Button>
  );
}
