import { Card, CardHeader, CardBody, Flex, Text, Box, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Divider } from '@chakra-ui/react'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import PropTypes from 'prop-types';

function Cards({ product, removeFromUI, setEditProductUI }) {
  return (
    <Card
      w="260px"
      h="max-content"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold" color="#7A7A7A">{product.name}</Text>
      </CardHeader>
      <CardBody>
        <Text fontSize="sm" color="#7A7A7A">Brand: {product.brand}</Text>
        <Text fontSize="sm" color="#7A7A7A">Model: {product.model}</Text>
        <Accordion allowToggle mt={2}>
          <AccordionItem>
            <AccordionButton _expanded={{ bg: '#FFD713', color: 'white' }}>
              <Box flex="1" textAlign="left">
                Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel overflowX="scroll">
              <Box maxW='-moz-max-content' borderWidth='1px' borderRadius='lg' p={4} display="flex" w="max-content">
                {product.details.map((detail, index) => (
                  <Box key={index} display="flex">
                    <Text>
                      Color: {detail.color} <br />
                      Price: US$ {detail.price} <br />
                    </Text>
                    <Divider orientation='vertical' marginLeft={6} marginRight={6} />
                  </Box>
                ))}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Flex gap={3} mt={2}>
          <DeleteButton id={product.id} removeFromUI={removeFromUI} />
          <EditButton product={product} setEditProductUI={setEditProductUI} />
        </Flex>
      </CardBody>
    </Card>
  )
}



Cards.propTypes = {
  product: PropTypes.object.isRequired,
  removeFromUI: PropTypes.func.isRequired,
  setEditProductUI: PropTypes.func.isRequired
};

export default Cards