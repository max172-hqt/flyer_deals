import { useCallback } from "react";
import { Product } from "../database/db";
import { AspectRatio, Box, HStack, Pressable, Image, VStack, Heading, Text, Button, Badge, List } from "native-base";
import React from "react";

function ListItem({ item, handleGoToDetail }: { item: Product, handleGoToDetail: () => void }) {
  const { name, imageUrl, salePrice, regularPrice, tags, description} = item.data;

  return (
    <Pressable onPress={handleGoToDetail}>
      <Box bg={'white'} m="2" p="4" borderRadius={16}>
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
              <HStack justifyContent="start" alignItems="center" space="2">
                <Text
                  _light={{
                    color: 'red.500',
                  }}
                  fontWeight="500"
                  fontSize="lg"
                >
                  {salePrice}
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
            <VStack space="2">
              <Text fontWeight={400} fontSize="xs" numberOfLines={5}>
                {description}
              </Text>
              <HStack flexWrap="wrap">
                {tags.map((tag, index) => (
                  <Badge
                    colorScheme="darkBlue"
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

export default React.memo(ListItem, itemPropsAreEqual);