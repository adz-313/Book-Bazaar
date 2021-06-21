import React from 'react';
import { Text, Center, VStack } from '@chakra-ui/react';

import Layout from '../components/Layout';

const error = () => {
    return (
        <Layout>
            <Center>
                <VStack>
                    <Text fontSize="6xl">Book Bazaar</Text>
                    <Text fontSize="3xl">Page not found</Text>
                </VStack>
            </Center>
        </Layout>
    )
}

export default error
