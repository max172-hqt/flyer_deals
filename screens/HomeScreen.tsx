import React from 'react';
import ProductList from '../components/ProductList';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from './ProductDetailScreen';
import type { ProductListStackParamList } from '../types';
import { secondaryColor, themeColor } from '../utils/constants';

const Stack = createStackNavigator<ProductListStackParamList>();

export default function HomeScreen() {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: themeColor,
        },
        headerTintColor: secondaryColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Stack.Screen
        name="List"
        component={ProductList}
        options={{
          title: 'Weekly Deals',
        }}
      />
      <Stack.Screen name="Details" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
