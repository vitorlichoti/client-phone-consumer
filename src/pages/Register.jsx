import { Center, Text, Link, FormControl, FormLabel, Input, Button, Flex, useToast, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";
import { axiosAuthHandler } from "../handler/axiosHandler";
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: ''
  })

  const [inputValid, setInputValid] = useState({
    name: false,
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
    avatar: false
  })

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async () => {
    setLoading(true)
    const checkName = input.name.length < 4
    const checkUsername = input.username.length < 4
    const checkPassword = input.password.length < 6
    const checkConfirmPassword = input.confirmPassword !== input.password
    const checkEmail = !input.email.includes('@') || !input.email.includes('.')

    setInputValid({
      name: checkName,
      username: checkUsername,
      password: checkPassword,
      confirmPassword: checkConfirmPassword,
      email: checkEmail
    })

    if (checkName || checkUsername || checkPassword || checkConfirmPassword || checkEmail) {
      toast({
        title: `Please, fill all fields correctly.`,
        status: 'error',
        isClosable: true,
      })
      setLoading(false)
    }

    try {
      const bodyData = {
        name: input.name,
        username: input.username,
        password: input.password,
        email: input.email,
        avatar_url: input.avatar
      }
      const data = await axiosAuthHandler.post('/api/auth/register', bodyData)

      if (data.status === 201) {
        toast({
          title: "Registered successfully!",
          status: 'success',
          isClosable: true,
        })

        setTimeout(() => navigate('/'), 2000)
        setLoading(false)
        return
      }

      toast({
        title: "Registered successfully!",
        status: 'success',
        isClosable: true,
      })
      setLoading(false)
      return
    } catch (error) {
      toast({
        title: `${error ? error.response.data.message : 'Error'}`,
        status: 'error',
        isClosable: true,
      })
      setLoading(false)
      return
    }

  }

  return (
    <Center>
      <Flex direction="column" align="center" justify="center" w="50%" paddingTop="100px">

        <Text fontSize="2xl" fontWeight="bold">Register Page</Text>
        <Text mt={4} textAlign="center">Already have an account? <Link color="blue" href="/login">Login</Link></Text>
        <Text mt={4} textAlign="center">Please, fill all fields to create your account.</Text>

        <FormControl isInvalid={input.name || input.username || input.email || input.password || input.confirmPassword} display="flex" flexDirection="column" alignContent="center" mt={65} mb={40}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input type="text" name="name" placeholder="Enter your full name" value={input.name} onChange={handleInputChange} required />
          {inputValid.name && <FormErrorMessage>Name must contain at least 4 characteres.</FormErrorMessage>}

          <FormLabel htmlFor="username" mt={5}>User Name</FormLabel>
          <Input type="text" name="username" placeholder="Enter your user name" value={input.username} onChange={handleInputChange} required />
          {inputValid.username && <FormErrorMessage>Name must contain at least 4 characteres.</FormErrorMessage>}

          <FormLabel htmlFor="password" mt={5}>Password</FormLabel>
          <Input type="password" name="password" placeholder="Enter your password" value={input.password} onChange={handleInputChange} required />
          {inputValid.password && <FormErrorMessage>Password must contain at least 6 characteres</FormErrorMessage>}

          <FormLabel htmlFor="confirmPassword" mt={5}>Confirm Password</FormLabel>
          <Input type="password" name="confirmPassword" placeholder="Confirm your password" value={input.confirmPassword} onChange={handleInputChange} required />
          {inputValid.confirmPassword && <FormErrorMessage>Password must contain at least 6 characteres</FormErrorMessage>}
          {input.confirmPassword !== input.password && <FormErrorMessage>Passwords don&apos;t match</FormErrorMessage>}

          <FormLabel htmlFor="email" mt={5}>Email</FormLabel>
          <Input type="email" name="email" placeholder="Enter your email" value={input.email} onChange={handleInputChange} required />
          {inputValid.email && <FormErrorMessage>Email is not valid</FormErrorMessage>}

          <FormLabel htmlFor="avatar" mt={5}>Avatar URL</FormLabel>
          <Input type="text" name="avatar" placeholder="Enter your avatar URL" value={input.avatar} onChange={handleInputChange} />

          <Button mt={4} onClick={handleRegister} isLoading={loading}>Register</Button>
        </FormControl>
      </Flex>

    </Center>
  )
}

export default RegisterPage;