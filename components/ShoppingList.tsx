import { FlatList } from 'native-base';
import React, { useMemo } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import ShoppingListItem from '../components/ShoppingListItem';

export default function ShoppingList({ navigation }: { navigation: any }) {
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
