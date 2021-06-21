import React,{ useState, useEffect } from 'react';
import { Box, Center, SimpleGrid, Input, Image, VStack, Text, HStack, Button } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { navigate } from "gatsby";

import read from '../../static/read.svg';
import { getUser, handleLogin } from '../services/auth';

const initialState = {
    identifier: "",
    password: ""
}

const Login = () => {

    const [formData, setFormData] = useState(initialState);

    const [user, setUser] = useState(getUser());

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        await handleLogin(formData);
        if(getUser().statusCode === 400) {
            alert('Incorrect email or password.');
            setLoading(false);
            return;
        }
        setUser(getUser());
    }

    useEffect(()=> {
        if(user.user){
            navigate('/');
        }
    },[user]);

    const handleClear = () => {
        setFormData(initialState);
    }    

    return (
        <Center>
            <Box minW="xs" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <SimpleGrid mt="5" columns={{sm: 1, md: 2}} spacing={10}>
                    <Box maxW="md" p="3" width={{sm: "100%", md: "100%"}}>
                        <VStack spacing={5}>
                            <HStack mt="3rem" mb="4rem">
                                <LockIcon boxSize={10} mr="1"/>
                                <Text fontSize="5xl">Login</Text>
                            </HStack>
                            <VStack width="100%" spacing={7}>
                                <Input type="email" size="lg" placeholder="Email" value={formData.email} onChange={(event) => setFormData({...formData, identifier: event.target.value})} />
                                <Input type="password" size="lg" placeholder="Password" value={formData.password} onChange={(event) => setFormData({...formData, password: event.target.value})} />
                                <Text as="a" href="/register">New here? Register instead...</Text>
                                <SimpleGrid width="100%" columns={2}>
                                    <Button isLoading={loading} width="100%" onClick={handleSubmit}>Submit</Button>
                                    <Button onClick={handleClear} ml="3" width="95%">Clear</Button>
                                </SimpleGrid>
                            </VStack>
                        </VStack>
                    </Box>
                    <Box maxW="md" p="3rem" >
                        <Image src={read} width={[0, 0, 500]} />
                    </Box>
                </SimpleGrid>
            </Box>
        </Center>
    )
}

export default Login
