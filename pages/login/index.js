import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
  const [account, setAccount] = useState('demo')
  const [password, setPassword] = useState('demo')
  const [pwShow, setPwShow] = useState(false)

  const handleClick = () => setPwShow(!pwShow)

  const login = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy our features ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="account">
              <FormLabel>Account</FormLabel>
              <Input type="account" value={account} />
            </FormControl>
            {/* <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl> */}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input pr="4.5rem" type={pwShow ? 'text' : 'password'} placeholder="Enter password" value={password} />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {pwShow ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                ocClick={login}
              >
                Log in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
