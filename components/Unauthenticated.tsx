import { Button, Heading, VStack } from 'native-base';
import React from 'react';
import { UnauthenticatedProps } from '../types';

export default function Unauthenticated({ navigation }: UnauthenticatedProps) {
  return (
    <VStack
      bg="white"
      space="4"
      flex={1}
      p="8"
      // alignItems="center"
      justifyContent="center"
    >
      <Heading fontSize="md" fontWeight="500">
        Please log in to add items to cart
      </Heading>
      <Button onPress={() => navigation.navigate('Login')}>Log In</Button>
    </VStack>
  );
}
