import { AspectRatio, Box, FlatList, Image, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Product, dbGetProducts } from '../../database/db';

const data = [
  {
    name: 'Aquastar King Crab Legs & Claws',
    salePrice: '$34.99',
    regularPrice: null,
    imageUrl: 'dam-img.rfdcontent.com/cms/009/448/369/9448369_original.jpg',
  },
];

const ListItem = ({ item }: { item: Product }) => {
  const data = item.data;
  return (
    <Box bg={['red.400', 'blue.400']} flex={1 / 2} m="4">
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image source={{ uri: 'https://' + data.imageUrl }} alt={data.name} />
      </AspectRatio>
    </Box>
  );
};

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const products = await dbGetProducts();
      setProducts(products);
    })();
  }, []);

  return (
    <FlatList
      bg="fff"
      numColumns={2}
      data={products}
      initialNumToRender={8}
      maxToRenderPerBatch={2}
      renderItem={({ item }) => <ListItem item={item}></ListItem>}
    ></FlatList>
  );
}
