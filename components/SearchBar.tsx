import { Button, HStack, Icon, Input } from 'native-base';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Keyboard } from 'react-native';

export default function SearchBar({
  handleSearch,
}: {
  handleSearch: (query: string) => void;
}) {
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleOnChangeText = (text: string) => {
    setValue(text);
  };

  const handleOnFocus = () => {
    setIsSearching(true);
  };

  const handleOnPressCancel = () => {
    Keyboard.dismiss();
    setIsSearching(false);
    setValue('');
    handleSearch('');
  };

  const handleOnSubmit = () => {
    handleSearch(value);
  };

  return (
    <HStack space={1} m="2" mb="2" alignItems="center" alignSelf="center">
      <Input
        bg="white"
        w={isSearching ? '4/5' : '100%'}
        onFocus={handleOnFocus}
        placeholder="Search product names and tags"
        py="3"
        px="1"
        fontSize="sm"
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
        onSubmitEditing={handleOnSubmit}
      />
      {isSearching && (
        <Button w="1/5" variant="link" onPress={handleOnPressCancel}>
          Cancel
        </Button>
      )}
    </HStack>
  );
}
