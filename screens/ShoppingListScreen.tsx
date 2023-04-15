import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingList from '../components/ShoppingList';
import ProductDetailScreen from './ProductDetailScreen';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm';
import Unauthenticated from '../components/Unauthenticated';
import SignupForm from '../components/SignupForm';

const Stack = createStackNavigator();

export default function ShoppingListScreen() {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

  if (!isLoggedIn) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Unauthenticated" component={Unauthenticated} 
        options={{
          title: 'Please log in to continue'
        }}/>
        <Stack.Screen name="Log In" component={LoginForm} />
        <Stack.Screen name="Sign Up" component={SignupForm} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={ShoppingList}
        options={{
          title: 'Shopping List',
        }}
      />
      <Stack.Screen name="Details" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
