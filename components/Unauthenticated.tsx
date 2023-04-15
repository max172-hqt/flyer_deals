import { Box, Button, Heading, Text, VStack } from 'native-base';
import React from 'react';

export default function Unauthenticated({ navigation }: { navigation: any }) {
  return (
    <VStack bg="white" space="4" flex={1} alignItems="center" justifyContent="center">
      <Heading fontSize="md" fontWeight="500">
        Please log in to add items to cart
      </Heading>
      <Button onPress={() => navigation.navigate("Log In")}>Log In</Button>
    </VStack>
  );
}
