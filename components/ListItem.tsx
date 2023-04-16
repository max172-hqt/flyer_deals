import {
  AspectRatio,
  Box,
  HStack,
  Pressable,
  Image,
  VStack,
  Heading,
  Text,
  Badge,
} from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../redux/productSlice';
import AddToCartButton from './AddToCartButton';
import type { Product } from '../types';
import { lightYellow } from '../utils/constants';

function ListItem({
  item,
  handleGoToDetail,
}: {
  item: Product;
  handleGoToDetail: () => void;
}) {
  const dispatch = useDispatch();
  const { name, imageUrl, salePrice, regularPrice, description, tags } =
    item.data;

  const handleOnPressItem = () => {
    dispatch(setCurrentProduct(item));
    handleGoToDetail();
  };

  return (
    <Pressable onPress={handleOnPressItem}>
      <Box bg={'white'} m="2" p="4" borderRadius={8}>
        <HStack alignContent="center" space="3" justifyContent="center">
          <AspectRatio ratio={9 / 16} w="2/5">
            <Image
              source={{ uri: 'https://' + imageUrl }}
              alt={name}
              resizeMode="contain"
            />
          </AspectRatio>
          <VStack pl="4" w="3/5" justifyContent="space-between" space={2}>
            <VStack space="2">
              <Heading size="sm" ml="-1" fontWeight="400" noOfLines={3}>
                {name}
              </Heading>
              <HStack justifyContent="flex-start" alignItems="center" space="2">
                <Text
                  _light={{
                    color: 'primary.400',
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
            <VStack space="2">
              <Text fontWeight={400} fontSize="xs" numberOfLines={3}>
                {description}
              </Text>
            </VStack>
            <HStack flexWrap="wrap">
              {tags.map((tag, index) => (
                <Badge
                  _text={{
                    color: 'primary.400',
                  }}
                  bg={lightYellow}
                  variant="solid"
                  rounded="4"
                  mr="1"
                  mb="1"
                  key={tag + index}
                >
                  {tag}
                </Badge>
              ))}
            </HStack>
            <AddToCartButton item={item} />
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
}

function itemPropsAreEqual(
  prevProps: Readonly<{ item: Product }>,
  nextProps: Readonly<{ item: Product }>
): boolean {
  return prevProps.item.id === nextProps.item.id;
}

export default React.memo(ListItem, itemPropsAreEqual);
