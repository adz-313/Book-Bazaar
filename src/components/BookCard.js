import React, { useState } from 'react';
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Divider, Box, Image, Badge, Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button } from '@chakra-ui/react';    
import { getUser } from '../services/auth';

const BookCard = ({ book, cart, setCart }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [user] = useState(getUser());
    
    const [value, setValue] = useState(book.qty);
    const handleChange = (value) => setValue(value);

    const handleAdd = () => {
        if(cart.length > 0 && cart.find(item => item.title === book.title)) {
            const res = cart.find(item => item.title === book.title);
            const updatedRes = {...res, qty: parseInt(value)}
            const filtered = cart.filter(item => item.title !== book.title);
            filtered.push(updatedRes);
            setCart(filtered);
        }
        else {
            setCart([...cart, {title: book.title, qty: value, price: book.price}]);
        }
        onClose();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add to Cart</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize="2xl">{book.title}</Text>
                    <Text mt="1" mb="2" fontSize="md">{book.author}</Text>
                    <Divider />
                    <Text mt="2" mb="3" fontSize="sm">{book.description}</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleAdd} disabled={!user.user ? true : false}>
                    Add to Cart
                    </Button>
                    <NumberInput maxW="100px" mr="2rem" value={value} onChange={handleChange}>
                        <NumberInputField />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <Box cursor="pointer" maxW="xs" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={onOpen}>
                <Image fallbackSrc="https://via.placeholder.com/450" src={`http://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg`}  alt={book.title} />

                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                            {book.category}
                        </Badge>
                    </Box>

                    <Box
                        mt="1"
                        fontWeight="semibold"
                        lineHeight="tight"
                        isTruncated
                        fontSize="md"
                    >
                        {book.title}
                    </Box>

                    <Box>
                    {book.price}
                    <Box as="span" color="gray.300" fontSize="md">
                        &nbsp; $
                    </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default BookCard;
