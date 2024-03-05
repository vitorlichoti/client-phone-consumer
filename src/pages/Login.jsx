import { Button, Center, Flex, FormLabel, Input, Text, FormControl, FormHelperText, FormErrorMessage, Link, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { axiosAuthHandler } from "../handler/axiosHandler";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const toast = useToast()
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const [isError, setIsError] = useState({
    username: false,
    password: false
  })

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async () => {
    const checkUsername = input.username.length < 4
    const checkPassword = input.password.length < 6

    if (checkUsername || checkPassword) {
      setIsError({
        username: checkUsername,
        password: checkPassword
      })
      return
    }

    try {
      const data = await axiosAuthHandler.post('/api/auth/login', input)

      localStorage.setItem('token', data.token)

      toast({
        title: "Logged in successfully!",
        status: 'success',
        isClosable: true,
      })

      navigate('/home')

    } catch (error) {
      console.log(error.response.data.message)
      return toast({
        title: `${error.response.data.message}`,
        status: 'error',
        isClosable: true,
      })
    }

    // if (data.status === 200) {
    //   localStorage.setItem('token', data.data.token)
    //   window.location.href = '/products'
    // }

  }

  return (
    <Center h="100vh" w="100vw">

      <Flex direction="column" w="400px" mt="20px" alignContent="center">
        <Text textAlign="center" fontSize="2xl" fontWeight="bold" mb={50}>Phone Consumer - Lexart Challenge</Text>

        <FormControl isInvalid={isError.username || isError.password} display="flex" flexDirection="column" alignContent="center">

          <FormLabel>Username</FormLabel>
          <Input type='text' name="username" value={input.username} onChange={handleInputChange} />
          {!isError.username ? (
            <FormHelperText>
            </FormHelperText>
          ) : (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}

          <FormLabel mt={3}>Password</FormLabel>
          <Input type='password' name="password" value={input.password} onChange={handleInputChange} />
          {!isError.password ? (
            <FormHelperText>
            </FormHelperText>
          ) : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}

          <Button mt={6} onClick={handleLogin}>Login</Button>
        </FormControl>

        <Text mt={4} textAlign="center">Dont have an account? <Link color="blue" href="/register">Register</Link></Text>
      </Flex>
    </Center>
  )
}

export default LoginPage;