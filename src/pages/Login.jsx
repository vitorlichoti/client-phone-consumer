import { Button, Center, Flex, FormLabel, Input, Text, FormControl, FormHelperText, FormErrorMessage, Link } from "@chakra-ui/react";
import { useState } from "react";

function LoginPage() {

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

  const handleLogin = () => {
    const checkUsername = input.username.length < 4
    const checkPassword = input.password.length < 6

    setIsError({
      username: checkUsername,
      password: checkPassword
    })
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