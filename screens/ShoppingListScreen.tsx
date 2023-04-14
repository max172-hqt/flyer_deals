import { Box, FlatList, Text } from 'native-base';
import React from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import ShoppingListItem from '../components/ShoppingListItem';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingList from '../components/ShoppingList';
import ProductDetailScreen from './ProductDetailScreen';

const Stack = createStackNavigator();

export default function ShoppingListScreen({
  navigation,
}: {
  navigation: any;
}) {
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
