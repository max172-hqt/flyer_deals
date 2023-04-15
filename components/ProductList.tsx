import { FlatList, Spinner, VStack, Heading } from 'native-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Product,
  dbGetProducts,
  dbSearchProductsByPrefix,
} from '../database/db';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import ListItem from './ListItem';
import SearchBar from './SearchBar';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { appendProducts, setProducts, setSearchResults } from '../redux/productSlice';
import { ProductFlatListProps } from '../types';

const NUMBER_OF_ITEMS = 10;

const ListFooter = () => {
  return <Spinner accessibilityLabel="Loading posts" size="sm" m="8" />;
};

const LoadingScreen = () => {
  return (
    <VStack
      flex="1"
      alignItems="center"
      justifyContent="center"
      space="2"
    >
      <Spinner accessibilityLabel="Loading posts" size="lg" />
      <Heading color="primary.500" fontSize="md">
        Loading Deals
      </Heading>
    </VStack>
  );
};

const ProductFlatList = ({
  products,
  onEndReached,
  handleGoToDetail,
  isLoading,
}: ProductFlatListProps) => {
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <FlatList
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
  );
};

export default function ProductList({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const searchResults = useSelector(
    (state: RootState) => state.product.searchResults
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const [lastSnapshot, setLastSnapshot] =
    useState<QueryDocumentSnapshot<DocumentData>>();

  useEffect(() => {
    return;
    (async () => {
      setIsLoading(true);
      const [newProducts, snap, ended] = await dbGetProducts(NUMBER_OF_ITEMS);
      dispatch(setProducts(newProducts));
      setLastSnapshot(snap);
      setEnded(ended);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    return;
    (async () => {
      if (query.length !== 0) {
        setIsLoading(true);
        const newProducts = await dbSearchProductsByPrefix(
          query,
          NUMBER_OF_ITEMS
        );
        dispatch(setSearchResults(newProducts));
        setIsLoading(false);
      }
    })();
  }, [query]);

  const onEndReached = useCallback(async () => {
    return;
    if (ended || isLoading || query.length > 0) return;

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
    setQuery(query);
  };

  if (products.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <VStack h="100%">
      <SearchBar handleSearch={handleSearch} />
      {query.length === 0 ? (
        <ProductFlatList
          products={products}
          isLoading={isLoading}
          handleGoToDetail={handleGoToDetail}
          onEndReached={onEndReached}
        />
      ) : (
        <ProductFlatList
          products={searchResults}
          isLoading={isLoading}
          handleGoToDetail={handleGoToDetail}
        />
      )}
    </VStack>
  );
}
