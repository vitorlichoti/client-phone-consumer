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
import { axiosProductsHandler } from '../handler/axiosHandler';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { AddIcon } from '@chakra-ui/icons';

function EditPhoneForms({ product, setEditProductUI }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [data, setData] = useState([{ price: 0, color: '' }]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setModel(product.model);
      setData(product.details);
    }
  }, [product]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPhone = [{
      name,
      brand,
      model,
      data
    }];

    setEditProductUI(newPhone[0]);

    try {
      const token = localStorage.getItem('token');
      const response = await axiosProductsHandler.put(`/api/products/${product.id}`, newPhone, {
        headers: {
          'Authorization': token
        }
      });

      if (response.status === 204) {

        toast({
          title: "Product updated successfully",
          status: 'success',
          isClosable: true,
        })

        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      return toast({
        title: `An error occurred, please try again. ${error.message}`,
        status: 'error',
        isClosable: true,
      })
    }

  };

  const isError = name === '' || brand === '' || model === '';

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={isError}>
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={handleNameChange} />
        <FormLabel>Brand</FormLabel>
        <Input type="text" value={brand} onChange={handleBrandChange} />
        <FormLabel>Model</FormLabel>
        <Input type="text" value={model} onChange={handleModelChange} />
        {data?.map((item, index) => (
          <Box key={index}>
            <FormLabel>Data {index + 1}</FormLabel>
            <Input
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
            />
            {index > 0 && (
              <Button type="button" onClick={() => handleRemoveDataField(index)}>
                Remove
              </Button>
            )}
          </Box>
        ))}
        <Button type="button" onClick={handleAddDataField}>
          <AddIcon ml={2} /> Add Detail
        </Button>
        {!isError ? (
          <FormHelperText>Fill in all fields.</FormHelperText>
        ) : (
          <FormErrorMessage>All fields are required.</FormErrorMessage>
        )}
        <Button isLoading={loading} type="submit">Submit</Button>
      </FormControl>
    </form>
  )
}

EditPhoneForms.propTypes = {
  product: PropTypes.object.isRequired,
  setEditProductUI: PropTypes.func.isRequired
};

export default EditPhoneForms