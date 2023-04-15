import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingList from '../components/ShoppingList';
import ProductDetailScreen from './ProductDetailScreen';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm';
import Unauthenticated from '../components/Unauthenticated';
import SignupForm from '../components/SignupForm';
import { dbGetCart } from '../database/db';
import { setCart } from '../redux/userSlice';
import LoadingScreen from '../components/LoadingScreen';
import type {
  AuthenticateStackParamList,
  ShoppingListStackParamList,
} from '../types';

const AuthenticateStack = createStackNavigator<AuthenticateStackParamList>();
const ShoppingListStack = createStackNavigator<ShoppingListStackParamList>();

export default function ShoppingListScreen() {
  const [isLoading, setLoading] = useState(false);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isLoggedIn && user) {
        setLoading(true);
        const cartItems = await dbGetCart(user);
        dispatch(setCart(cartItems));
        setLoading(false);
      }
    })();
  }, [isLoggedIn]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return (
      <AuthenticateStack.Navigator initialRouteName="Login">
        <AuthenticateStack.Screen
          name="Unauthenticated"
          component={Unauthenticated}
          options={{
            title: 'Please log in to continue',
          }}
        />
        <AuthenticateStack.Screen
          name="Login"
          component={LoginForm}
          options={{ title: 'Log In' }}
        />
        <AuthenticateStack.Screen
          name="Signup"
          component={SignupForm}
          options={{ title: 'Sign Up' }}
        />
      </AuthenticateStack.Navigator>
    );
  }

  return (
    <ShoppingListStack.Navigator initialRouteName="List">
      <ShoppingListStack.Screen
        name="List"
        component={ShoppingList}
        options={{
          title: 'Shopping List',
        }}
      />
      <ShoppingListStack.Screen
        name="Details"
        component={ProductDetailScreen}
      />
    </ShoppingListStack.Navigator>
  );
}
