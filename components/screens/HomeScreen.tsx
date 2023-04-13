import {
  AspectRatio,
  Box,
  Button,
  FlatList,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Product, dbGetProducts } from '../../database/db';
import { Pressable } from 'react-native';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

const NUMBER_OF_ITEMS = 20;

const ListItem = ({ item }: { item: Product }) => {
  const data = item.data;

  const handleShowDetail = useCallback(() => {
    console.log('Hello world');
  }, []);

  return (
    <Pressable onPress={handleShowDetail}>
      {({ pressed }) => {
        return (
          <Box bg={pressed ? 'coolGray.200' : 'white'} m="4">
            <HStack alignContent="center" space="3">
              <AspectRatio ratio={10 / 16} w="1/3">
                <Image
                  source={{ uri: 'https://' + data.imageUrl }}
                  alt={data.name}
                  resizeMode="contain"
                />
              </AspectRatio>
              <VStack p="4" w="2/3" justifyContent="space-around">
                <Heading size="md" ml="-1" fontWeight="400" noOfLines={2}>
                  {data.name}
                </Heading>
                <HStack justifyContent="start" alignItems="center" space="2">
                  <Text
                    _light={{
                      color: 'red.500',
                    }}
                    fontWeight="bold"
                    fontSize="md"
                  >
                    {data.salePrice}
                  </Text>
                  {data.regularPrice && (
                    <Text
                      _light={{
                        color: 'gray.500',
                      }}
                      strikeThrough
                      fontWeight={500}
                      fontSize="sm"
                    >
                      List: {data.regularPrice}
                    </Text>
                  )}
                </HStack>
                <HStack space="2">
                  <Button onPress={() => console.log('hello world')}>
                    Add to cart
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};

function itemPropsAreEqual(
  prevProps: Readonly<{ item: Product }>,
  nextProps: Readonly<{ item: Product }>
): boolean {
  return prevProps.item.id === nextProps.item.id;
}

const ListItemMemo = React.memo(ListItem, itemPropsAreEqual);

const ListFooter = () => {
  return <Spinner accessibilityLabel="Loading posts" size="sm" />;
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

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);

  const [lastSnapshot, setLastSnapshot] =
    useState<QueryDocumentSnapshot<DocumentData>>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const [products, snap, ended] = await dbGetProducts(NUMBER_OF_ITEMS);
      setProducts(products);
      setLastSnapshot(snap);
      setEnded(ended);
      setIsLoading(false);
    })();
  }, []);

  const onEndReached = useCallback(async () => {
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

  if (products.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <FlatList
      bg="white"
      data={products}
      initialNumToRender={NUMBER_OF_ITEMS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ListItemMemo item={item}></ListItemMemo>}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      ListFooterComponent={() =>
        isLoading && products.length > 0 ? <ListFooter /> : null
      }
      disableScrollViewPanResponder={true}
    ></FlatList>
  );
}
