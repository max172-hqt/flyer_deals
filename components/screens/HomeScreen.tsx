import {
  AspectRatio,
  Badge,
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

const NUMBER_OF_ITEMS = 5;

const ListItem = ({ item }: { item: Product }) => {
  const data = item.data;

  const handleShowDetail = useCallback(() => {
    console.log('Hello world');
  }, []);

  return (
    <Pressable onPress={handleShowDetail}>
      <Box bg={'white'} m="2" p="4" borderRadius={16}>
        <HStack alignContent="center" space="3">
          <AspectRatio ratio={9 / 16} w="2/5">
            <Image
              source={{ uri: 'https://' + data.imageUrl }}
              alt={data.name}
              resizeMode="contain"
            />
          </AspectRatio>
          <VStack pl="4" w="3/5" justifyContent="space-between" space={2}>
            <VStack space="2">
              <Heading size="sm" ml="-1" fontWeight="400" noOfLines={3}>
                {data.name}
              </Heading>
              <HStack justifyContent="start" alignItems="center" space="2">
                <Text
                  _light={{
                    color: 'red.500',
                  }}
                  fontWeight="500"
                  fontSize="lg"
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
            </VStack>
            <VStack space="2">
              <Text fontWeight={400} fontSize="xs">
                {data.description}
              </Text>
              <HStack flexWrap="wrap">
                {data.tags.map(tag => (
                <Badge
                  colorScheme="darkBlue"
                  _text={{
                    color: 'white',
                  }}
                  variant="solid"
                  rounded="4"
                  m="1"
                  key={tag}
                >
                {tag}
                </Badge>

                ))}
              </HStack>
            </VStack>
            <Button
              // variant="primary"
              onPress={() => console.log('hello world')}
            >
              Add to cart
            </Button>
          </VStack>
        </HStack>
      </Box>
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

  if (products.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <FlatList
      // bg="white"
      data={products}
      initialNumToRender={NUMBER_OF_ITEMS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ListItemMemo item={item}></ListItemMemo>}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        isLoading && products.length > 0 ? <ListFooter /> : null
      }
      disableScrollViewPanResponder={true}
    ></FlatList>
  );
}
