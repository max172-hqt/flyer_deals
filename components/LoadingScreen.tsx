import { Heading, Spinner, VStack } from 'native-base';
import React from 'react';

export default function LoadingScreen() {
  return (
    <VStack flex="1" alignItems="center" justifyContent="center" space="2">
      <Spinner accessibilityLabel="Loading posts" size="lg" />
      <Heading color="primary.500" fontSize="md">
        Loading Deals
      </Heading>
    </VStack>
  );
}
