import { FlatList, Spinner, VStack, Heading } from 'native-base';
import React, { useState, useEffect, useCallback } from 'react';
import { Product, dbGetProducts } from '../database/db';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import ListItem from './ListItem';

const NUMBER_OF_ITEMS = 20;

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

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      data: {
        name: 'Atlantic Lobster Tails Or Fresh Atlantic Salmon Portions',
        salePrice: '$4.99',
        regularPrice: undefined,
        imageUrl: 'dam-img.rfdcontent.com/cms/009/467/864/9467864_original.jpg',
        description:
          'Atlantic lobster tails, frozen or thawed for your convenience 2 - 3 oz. Fresh Atlantic salmon portions. Selected varieties 113 g. Subject to availability. Prices and offers effective from Thursday, April 13th to Wednesday, April 19th, 2023 unless otherwise stated.',
        tags: ['salmon', 'lobster', 'frozen'],
      },
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);

  const [lastSnapshot, setLastSnapshot] =
    useState<QueryDocumentSnapshot<DocumentData>>();

  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true);
  //     const [products, snap, ended] = await dbGetProducts(NUMBER_OF_ITEMS);
  //     setProducts(products);
  //     setLastSnapshot(snap);
  //     setEnded(ended);
  //     setIsLoading(false);
  //   })();
  // }, []);

  const onEndReached = useCallback(async () => {
    return;
    if (ended || isLoading) return;

    setIsLoading(true);
    const [newProducts, snap, isEnded] = await dbGetProducts(
      NUMBER_OF_ITEMS,
      lastSnapshot
    );
    setProducts((previousState) => [...previousState, ...newProducts]);
    setLastSnapshot(snap);
    setEnded(isEnded);
    setIsLoading(false);
  }, [lastSnapshot, ended, isLoading]);

  const handleGoToDetail = () => {
    navigation.navigate('Details')
  }

  if (products.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <FlatList
      // bg="white"
      data={products}
      initialNumToRender={NUMBER_OF_ITEMS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ListItem item={item} handleGoToDetail={handleGoToDetail}></ListItem>}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        isLoading && products.length > 0 ? <ListFooter /> : null
      }
      disableScrollViewPanResponder={true}
    ></FlatList>
  );
}
