import { Box, Button, Text, Heading, VStack, Toast } from 'native-base';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { logout } from '../database/auth';
import { resetUser } from '../redux/userSlice';
import { AccountProps } from '../types';

export default function AccountScreen({ navigation }: AccountProps) {
  const { user } = useSelector((state: RootState) => state.user);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      dispatch(resetUser());
      setLoading(false);
      Toast.show({
        description: 'You have been signed out',
        duration: 1000,
      });
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
        <Button
          onPress={handleLogout}
          isLoading={isLoading}
          isLoadingText="Logging Out"
        >
          Log Out
        </Button>
      </VStack>
    </Box>
  );
}
