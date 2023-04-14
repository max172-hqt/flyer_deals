import { Button, HStack, Heading, Icon, Input, PresenceTransition, VStack } from 'native-base';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Keyboard } from 'react-native';

export default function SearchBar({
  handleSearch,
}: {
  handleSearch: (query: string) => void;
}) {
  const [value, setValue] = useState('');
  const [isFocused, setFocused] = useState(false);

  const handleOnChangeText = (text: string) => {
    setValue(text);
    handleSearch(text);
  };

  const handleOnFocus = () => {
    setFocused(true);
  };

  const handleOnPressCancel = () => {
    Keyboard.dismiss()
    setFocused(false);
  }

  return (
    <HStack
      space={2}
      m="4"
      mb="3"
      alignItems="center"
      alignSelf="center"
    >
      <Input
        bg="white"
        w={isFocused ? '4/5' : '100%'}
        onFocus={handleOnFocus}
        placeholder="Search product names and tags"
        // borderRadius="4"
        // py="3"
        // px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<Ionicons name="search" />}
          />
        }
        value={value}
        onChangeText={handleOnChangeText}
      />
      {isFocused && (
        <Button w="1/5" variant="link" onPress={handleOnPressCancel}>
          Cancel
        </Button>
      )}
    </HStack>
  );
}
