import React from 'react';
import { Product } from '../database/db';
import {
  Box,
  HStack,
  Image,
  AspectRatio,
  VStack,
  Heading,
  Text,
  Badge,
  Button,
} from 'native-base';

export default function ListItemDetail({ item }: { item: Product | null }) {
  if (!item) return null;

  const { name, imageUrl, salePrice, regularPrice, tags, description } =
    item.data;

  return (
    <Box bg={'white'} m="2" p="4" borderRadius={16}>
      <VStack alignContent="center" space="3" justifyContent="center">
        <AspectRatio ratio={16 / 9}>
          <Image
            source={{ uri: 'https://' + imageUrl }}
            alt={name}
            resizeMode="contain"
          />
        </AspectRatio>
        <VStack justifyContent="space-between" space="2">
          <VStack space="2">
            <Heading size="md" ml="-1" fontWeight="500">
              {name}
            </Heading>
            <HStack justifyContent="start" alignItems="center" space="2">
              <Text
                _light={{
                  color: 'red.500',
                }}
                fontWeight="500"
                fontSize="lg"
              >
                On Sale: {salePrice}
              </Text>
              {regularPrice && (
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
          <VStack space="4">
            <Text fontWeight={400} fontSize="sm">
              {description}
            </Text>
            <Button
              // variant="primary"
              onPress={() => console.log('hello world')}
            >
              Add to cart
            </Button>
            <VStack space="2">
              <Heading size="sm" ml="-1" fontWeight="500">
                Tags
              </Heading>
              <HStack flexWrap="wrap">
                {tags.map((tag, index) => (
                  <Badge
                    _text={{
                      color: 'white',
                    }}
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
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
