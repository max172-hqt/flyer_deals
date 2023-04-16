import { Box, Button, Text, Heading, VStack } from 'native-base';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { logout } from '../database/auth';
import { resetUser } from '../redux/userSlice';
import { AccountProps } from '../types';

export default function AccountScreen({ navigation }: AccountProps) {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(resetUser());
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box bg="white" flex="1">
      <VStack space="4" p="8">
        <Heading fontSize="md">Email: {user?.email}</Heading>
        <Text fontSize="xs">ID: {user?.uid}</Text>
        <Button onPress={handleLogout}>Log Out</Button>
      </VStack>
    </Box>
  );
}
