import React from 'react';
import { useColorMode, Box, Text } from '@chakra-ui/react';
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
    const {colorMode, toggleColorMode } = useColorMode();

    const cart = [];

    return (
        <div>
            <Navbar toggleColorMode={toggleColorMode} colorMode={colorMode} cart={cart}/>
            <Box minH="77vh" p="7">
                { children }
            </Box>
            <footer>
                <Text as="a" href="#" textAlign="center" m="2rem auto">Copyright © 2021 Book Bazaar</Text>
            </footer>
        </div>
    )
}

export default Layout
