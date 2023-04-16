import { FlatList, Heading, VStack } from 'native-base';
import React, { useMemo } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import ShoppingListItem from '../components/ShoppingListItem';
import { ShoppingListProps } from '../types';

export default function ShoppingList({ navigation }: ShoppingListProps) {
  const cart = useSelector((state: RootState) => state.user.cart);

  const handleGoToDetail = () => {
    navigation.navigate('Details');
  };

  const data = useMemo(
    () =>
      Object.keys(cart).map((id) => ({
        ...cart[id],
      })),
    [cart]
  );

  if (data.length === 0) {
    return (
      <VStack flex="1" alignItems="center" justifyContent="center" space="2">
      <Heading color="light.400" fontSize="md">
        Your shopping cart is currently empty.
      </Heading>
    </VStack>
    )
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ShoppingListItem
          item={item}
          handleGoToDetail={handleGoToDetail}
        ></ShoppingListItem>
      )}
      onEndReachedThreshold={0.5}
      disableScrollViewPanResponder={true}
    ></FlatList>
  );
}
