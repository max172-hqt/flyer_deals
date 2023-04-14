import { FlatList, Spinner, VStack, Heading } from 'native-base';
import React, { useState, useCallback, useEffect } from 'react';
import { Product, dbGetProducts } from '../database/db';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import ListItem from './ListItem';
import SearchBar from './SearchBar';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { appendProducts } from '../redux/productSlice';

const NUMBER_OF_ITEMS = 10;

const ListFooter = () => {
  return <Spinner accessibilityLabel="Loading posts" size="sm" m="8" />;
};

const LoadingScreen = () => {
  return (
    <VStack alignItems="center" justifyContent="center" h="100%" space="2">
      <Spinner accessibilityLabel="Loading posts" size="lg" />
      <Heading color="primary.500" fontSize="md">
        Loading Deals
      </Heading>
    </VStack>
  );
};

export default function ProductList({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);

  const [lastSnapshot, setLastSnapshot] =
    useState<QueryDocumentSnapshot<DocumentData>>();

  useEffect(() => {
    return;
    (async () => {
      setIsLoading(true);
      const [newProducts, snap, ended] = await dbGetProducts(NUMBER_OF_ITEMS);
      dispatch(appendProducts(newProducts));
      setLastSnapshot(snap);
      setEnded(ended);
      setIsLoading(false);
    })();
  }, []);

  const onEndReached = useCallback(async () => {
    return;
    if (ended || isLoading) return;

    setIsLoading(true);
    const [newProducts, snap, isEnded] = await dbGetProducts(
      NUMBER_OF_ITEMS,
      lastSnapshot
    );
    dispatch(appendProducts(newProducts));
    setLastSnapshot(snap);
    setEnded(isEnded);
    setIsLoading(false);
  }, [lastSnapshot, ended, isLoading]);

  const handleGoToDetail = () => {
    navigation.navigate('Details');
  };

  const handleSearch = (query: string) => {
    console.log(query);
  }

  if (products.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <VStack>
      <SearchBar handleSearch={handleSearch} />
      <FlatList
        // bg="white"
        h="100%"
        data={products}
        initialNumToRender={NUMBER_OF_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem item={item} handleGoToDetail={handleGoToDetail}></ListItem>
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isLoading && products.length > 0 ? <ListFooter /> : null
        }
        disableScrollViewPanResponder={true}
      ></FlatList>
    </VStack>
  );
}
