import { EditIcon } from '@chakra-ui/icons'
import { Button, Center, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import EditPhoneForms from './EditPhoneForms'
import PropTypes from 'prop-types';

function EditButton({ product, setEditProductUI }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Center>
      <Button onClick={onOpen}>
        <EditIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add phone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditPhoneForms product={product} setEditProductUI={setEditProductUI} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}

EditButton.propTypes = {
  product: PropTypes.object.isRequired,
  setEditProductUI: PropTypes.func.isRequired
};

export default EditButton