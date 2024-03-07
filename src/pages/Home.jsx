import { Container, Flex, Input, Text, useToast, Center, Select, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import TopBar from "../components/TopBar"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Cards from "../components/Card";

import { getProducts, validateToken } from "./service/HomeService";
import { AddIcon } from "@chakra-ui/icons";
import PostNewPhoneForms from "../components/PostNewPhoneForms";

function HomePage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [phoneName, setPhoneName] = useState('');
  const [phoneTemp, setPhoneTemp] = useState([]);

  const [sort, setSort] = useState('');

  useEffect(() => {
    getProducts(setProducts, toast, setPhoneTemp);

    setTimeout(() => {
      validateToken(navigate, toast);
    }, 3000);
  }, []);

  const removeFromUI = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
  }

  const updateProductUI = (product) => {
    const newProducts = products.map((p) => {
      if (p.id === product.id) {
        return product;
      }

      return p;
    });

    setProducts(newProducts);
  }

  const handleClose = () => {
    onClose();
    getProducts(setProducts, toast);
  }

  useEffect(() => {
    if (phoneName === '') {
      setProducts(phoneTemp);
    } else {
      setProducts(phoneTemp.filter((product) =>
        product.name.toLowerCase().includes(phoneName.toLowerCase())
      ));
    }
  }, [phoneName, phoneTemp]);

  useEffect(() => {
    if (sort === 'asc') {
      setProducts(products.sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setProducts(products.sort((a, b) => b.name.localeCompare(a.name)));
    }
  }, [sort]);

  return (
    <Center sx={
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px',
        maxWidth: '100%'
      }

    }>
      <TopBar />

      <Flex width="50%" justifyContent="center">
        <Flex alignItems="center">
          <Text textAlign="center" fontSize="sm" fontWeight="bold" color="#7A7A7A" marginRight={2}>Filter by phone name: </Text>
          <Input type="text" placeholder="Type search phone" width="200px" onChange={(e) => setPhoneName(e.target.value)} />

        </Flex>

        <Flex alignItems="center" marginLeft={30}>
          <Text textAlign="center" fontSize="sm" fontWeight="bold" color="#7A7A7A" marginRight={2}>Filter by A - z </Text>
          <Select width="135px" marginRight={2} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Flex>
      </Flex>

      <Center>
        {products.length === 0 ? <Button onClick={() => getProducts(setProducts)}>No products found, click here to reload!</Button> : null}
      </Center>

      <Center>
        <Button onClick={onOpen}>
          <AddIcon mr={2} />
          Add phone
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add phone</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <PostNewPhoneForms />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>

      <Container width="100%" display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" gap="20px"
        sx={
          {
            maxWidth: '50%'
          }
        }
      >
        {products.map((product) => (
          <Cards key={product.id} product={product} removeFromUI={removeFromUI} setEditProductUI={updateProductUI} />
        ))}
      </Container>
    </Center>
  )
}

export default HomePage