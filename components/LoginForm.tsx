import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  VStack,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../database/auth';
import { setUser } from '../redux/userSlice';
import type { LoginProps } from '../types';

export default function LoginForm({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();

  const handleLogIn = async () => {
    try {
      setLoading(true);
      const user = await login(email, password);
      dispatch(setUser({ uid: user.uid, email: user.email }));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setValid(false);
      setLoading(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <Center w="100%" flex="1" justifyContent="flex-start" bg="white">
      <Box safeArea p="2" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Log In
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={handleEmailChange} />
          </FormControl>
          <FormControl isInvalid={!valid}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={handlePasswordChange}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Wrong email or password. Please try again.
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            mt="2"
            onPress={handleLogIn}
            isLoading={isLoading}
            isLoadingText="Logging In"
            isDisabled={email.length === 0 || password.length === 0}
          >
            Log in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm">I'm a new user. </Text>
            <Link onPress={() => navigation.navigate('Signup')}>Sign Up</Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
