import React from 'react';
import ProductList from '../components/ProductList';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from './ProductDetailScreen';

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={ProductList}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen name="Details" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
