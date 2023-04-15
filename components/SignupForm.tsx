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
} from 'native-base';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, signup } from '../database/auth';
import { setUser } from '../redux/userSlice';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      setLoading(true);
      const user = await signup(email, password);
      dispatch(setUser({ uid: user.uid, email: user.email }));
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
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
          Sign Up
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={handleEmailChange} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={handlePasswordChange}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
          </FormControl>
          <Button
            mt="2"
            onPress={handleSignup}
            isLoading={isLoading}
            isLoadingText="Logging In"
          >
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
