import { AspectRatio, Box, FlatList, Image, Text } from 'native-base';
import React from 'react';

const data = [
  {
    "name": "Aquastar King Crab Legs & Claws",
    "salePrice": "$34.99",
    "regularPrice": null,
    "imageUrl": "dam-img.rfdcontent.com/cms/009/448/369/9448369_original.jpg"
  },
]


const ListItem = ({ item }) => {
  return (
    <Box bg={['red.400', 'blue.400']} flex={1 / 2} m="4">
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image source={{ uri: "https://" + item.imageUrl }} alt="image" />
      </AspectRatio>
    </Box>
  );
};

export default function HomeScreen() {
  return (
    <FlatList
      bg="fff"
      numColumns={2}
      data={data}
      initialNumToRender={8}
                    maxToRenderPerBatch={2}
      renderItem={({ item }) => <ListItem item={item}></ListItem>}
    ></FlatList>
  );
}
