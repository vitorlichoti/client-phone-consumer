import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Box,
  useToast
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { axiosProductsHandler } from '../handler/axiosHandler';

function PostNewPhoneForms() {
  const toast = useToast();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [data, setData] = useState([
    { price: 0, color: '' },
  ]);

  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleDataChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleAddDataField = () => {
    setData([...data, { price: 0, color: '' }]);
  };

  const handleRemoveDataField = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const isError = name === '' || brand === '' || model === '';

  const handlePostNewPhone = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const newPhone = [{
        name,
        brand,
        model,
        data
      }]
      const response = await axiosProductsHandler.post('/api/products', newPhone, {
        headers: {
          'Authorization': token
        }
      });


      if (response.status === 201) {
        setName('');
        setBrand('');
        setModel('');
        setData([{ price: 0, color: '' }]);

        toast({
          title: "Product created successfully",
          status: 'success',
          isClosable: true,
        })
        setLoading(false);
        return
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast({
        title: "An error occurred, please try again.",
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>Name</FormLabel>
      <Input type="text" value={name} onChange={handleNameChange} required />
      <FormLabel>Brand</FormLabel>
      <Input type="text" value={brand} onChange={handleBrandChange} required />
      <FormLabel>Model</FormLabel>
      <Input type="text" value={model} onChange={handleModelChange} required />
      {data.map((item, index) => (
        <Box key={index} display="flex" alignItems="center" mt={3} gap={2}>
          <FormLabel w="100px">Details {index + 1}:</FormLabel>
          <Input
            width="100px"
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleDataChange(index, 'price', parseInt(e.target.value))}
          />
          <Input
            type="text"
            placeholder="Color"
            value={item.color}
            onChange={(e) => handleDataChange(index, 'color', e.target.value)}
            width="200px"
          />
          {index > 0 && (
            <Button type="button" onClick={() => handleRemoveDataField(index)}>
              <DeleteIcon />
            </Button>
          )}

        </Box>
      ))}
      <Button type="button" onClick={handleAddDataField} mt={4}>
        <AddIcon mr={2} />
        Add more details
      </Button>
      {!isError ? (
        <FormHelperText>Fill in all fields.</FormHelperText>
      ) : (
        <FormErrorMessage>All fields are required.</FormErrorMessage>
      )}
      <Button isLoading={loading} mt={4} type="button" onClick={handlePostNewPhone}>Submit</Button>
    </FormControl>
  )
}

export default PostNewPhoneForms