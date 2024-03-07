import { DeleteIcon } from '@chakra-ui/icons'
import { Button, useToast } from '@chakra-ui/react'
import { axiosProductsHandler } from '../handler/axiosHandler';
import PropTypes from 'prop-types';

function DeleteButton({ id, removeFromUI }) {
  const toast = useToast();
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosProductsHandler.delete(`/api/products/${id}`, {
        headers: {
          'Authorization': token
        }
      });

      if (response.status === 200) {
        removeFromUI(id);
        toast({
          title: "Product deleted successfully",
          status: 'success',
          isClosable: true,
        })
        return
      }

      toast({
        title: "An error occurred, please try again.",
        status: 'error',
        isClosable: true,
      })
      return
    } catch (error) {
      toast({
        title: "An error occurred, please try again latter.",
        status: 'error',
        isClosable: true,
      })
      return
    }
  }

  return (
    <Button onClick={handleDelete}>
      <DeleteIcon />
    </Button>
  )
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  removeFromUI: PropTypes.func.isRequired
};

export default DeleteButton