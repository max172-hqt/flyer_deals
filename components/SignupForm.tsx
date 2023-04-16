import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../database/auth';
import { setUser } from '../redux/userSlice';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setValid(false);
      return;
    }
    setValid(true);
    try {
      setLoading(true);
      const user = await signup(email, password);
      dispatch(setUser({ uid: user.uid, email: user.email }));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setValid(false);
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
          <FormControl isInvalid={!valid}>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Password fields do not match. Please try again.
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            mt="2"
            onPress={handleSignup}
            isLoading={isLoading}
            isLoadingText="Logging In"
            isDisabled={
              email.length === 0 ||
              password.length === 0 ||
              confirmPassword.length === 0
            }
          >
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
