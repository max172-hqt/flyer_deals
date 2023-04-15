import {
  AspectRatio,
  Box,
  HStack,
  Pressable,
  Image,
  VStack,
  Heading,
  Text,
  Switch,
} from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../redux/productSlice';
import type { CartItem } from '../types';

function ShoppingListItem({
  item,
  handleGoToDetail,
}: {
  item: CartItem;
  handleGoToDetail: () => void;
}) {
  const dispatch = useDispatch();
  const { name, imageUrl, salePrice, regularPrice } = item.data;

  const handleOnPressItem = () => {
    dispatch(setCurrentProduct(item));
    handleGoToDetail();
  };

  return (
    <Pressable onPress={handleOnPressItem}>
      <Box bg={'white'} m="2" p="4" borderRadius={8}>
        <HStack alignItems="center" space="3" justifyContent="flex-start">
          <AspectRatio ratio={1} w='1/5'>
            <Image
              source={{ uri: 'https://' + imageUrl }}
              alt={name}
              resizeMode='cover'
              borderRadius={50}
            />
          </AspectRatio>
          <VStack
            pl="4"
            w={'3/5'}
            justifyContent="space-between"
            space={2}
          >
            <VStack space="2">
              <Heading size="sm" ml="-1" fontWeight="400" noOfLines={3}>
                {name}
              </Heading>
              <HStack justifyContent="flex-start" alignItems="center" space="2">
                <Text
                  _light={{
                    color: 'red.500',
                  }}
                  fontWeight="500"
                  fontSize="lg"
                >
                  {salePrice}
                </Text>
                {regularPrice !== null && regularPrice.length > 0 && (
                  <Text
                    _light={{
                      color: 'gray.500',
                    }}
                    strikeThrough
                    fontWeight={500}
                    fontSize="sm"
                  >
                    List: {regularPrice}
                  </Text>
                )}
              </HStack>
            </VStack>
          </VStack>
          <Switch size="sm" />
        </HStack>
      </Box>
    </Pressable>
  );
}

function itemPropsAreEqual(
  prevProps: Readonly<{ item: CartItem }>,
  nextProps: Readonly<{ item: CartItem }>
): boolean {
  return prevProps.item.id === nextProps.item.id;
}

export default React.memo(ShoppingListItem, itemPropsAreEqual);
