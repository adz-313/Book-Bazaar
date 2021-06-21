import React, { useState, useEffect } from 'react';
import { Center, useToast, Table, Thead, Tbody, Tr, Th, Td, Flex, Box, Heading, Spacer, IconButton, Divider, Text,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button } from '@chakra-ui/react';
import { SunIcon, MoonIcon, DeleteIcon } from '@chakra-ui/icons';

import { getUser } from '../services/auth';

const Navbar = ({ toggleColorMode, colorMode, cart, setCart }) => {
    const [user, setUser] = useState(getUser());

    console.log(cart);

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = () => {
        localStorage.clear();
        setUser({});
    }

    const handleDelete = (item) => {
        const res = cart.filter(book => book.title !== item.title);
        setCart(res);
    }

    const [total, setTotal] = useState(0)

    useEffect(() => {
        let sum = 0;
        cart.map(item => sum += item.price * item.qty);
        setTotal(sum);
    },[cart]);

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Cart</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                {cart.length > 0 ?
                <Table variant="simple">
                    <Thead>
                        <Tr>
                        <Th>Title</Th>
                        <Th>Quantity</Th>
                        <Th isNumeric>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                     {cart.map(item => (
                        <Tr>
                            <Td>{item.title}</Td>
                            <Td>{item.qty}</Td>
                            <Td isNumeric>{item.price * item.qty}</Td>
                            <Td>
                                <IconButton borderRadius="25" onClick={() => handleDelete(item)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Td>
                        </Tr>
                    ))}
                     <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td>
                            <Text>Total: {total}</Text>
                        </Td>
                    </Tr>
                </Tbody>
                </Table> :
                <Center h="10rem">
                    <Text fontSize="2xl">Cart Empty</Text>    
                </Center>}
                </ModalBody>
                <ModalFooter>
                    <Button disabled={cart.length === 0} colorScheme="blue" mr={3} onClick={() => {
                        toast({
                        title: "Order placed.",
                        description: "Your order will be delivered to your registered address shortly.",
                        status: "success",
                        duration: 9000,
                        position: "bottom-left",
                        isClosable: true,
                        });
                        setCart([])}
                    }>
                    Order
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex align='center' pt="1">
                <Box p="2">
                    <Heading size="lg" as="a" href="/">Book Bazaar</Heading>
                </Box>
                <Spacer />
                <Box mr="2"> 
                    {user.user ? 
                    <>
                        <Text float="left" fontSize="xl" mr="3" mt="1">{user.user.Name}</Text>
                        <Button pb="1" mr="3" pl="3" pr="4" onClick={onOpen}>Cart</Button>
                    </> 
                    : null}
                    <IconButton borderRadius="6" mr="3" onClick={toggleColorMode}>
                        {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                    </IconButton>
                    {user.user ? <Button pb="1" onClick={handleLogout}>Logout</Button> : <Button pb="1" as="a" href="/login">Log in</Button>}
                </Box>
            </Flex>
            <Divider mt="1"/>
        </div>
    )
}

export default Navbar;
