import React,{ useState, useEffect } from 'react';
import { Box, Center, SimpleGrid, Input, Textarea, VStack, Text, HStack, Button } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { navigate } from "gatsby";
import { getUser, handleRegister } from '../services/auth';

const initialState = {
    Name: "",
    username: "",
    email: "",
    password: ""
}

const Login = () => {

    const [formData, setFormData] = useState(initialState);

    const [user, setUser] = useState(getUser());

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        
        await handleRegister(formData);
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
    
    const handleUpdate = event => {
        setFormData({
            ...formData,
          [event.target.name]: event.target.value,
        })
      }

    return (
        <Center>
            <Box minW="xs" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Box p="3" width={{sm: "100%", md: "100%"}}>
                    <VStack spacing={5}>
                        <HStack mt="3rem" mb="4rem">
                            <LockIcon boxSize={10} mr="1"/>
                            <Text fontSize="5xl">Register</Text>
                        </HStack>
                        <SimpleGrid mt="5" columns={{sm: 1, md: 2}} spacing={10}>
                        <VStack width="100%" minW="xs" spacing={7}>
                            <Textarea name="address" resize="none" placeholder="Address" />
                            <Input type="text" name="city" size="lg" placeholder="City"/>
                            <Input type="country" name="country" size="lg" placeholder="Country"/>
                            <Input type="phone" name="phone" size="lg" placeholder="Phone"/>
                        </VStack>    
                        <VStack width="100%" minW="xs" spacing={7}>
                            <Input type="text" name="Name" size="lg" placeholder="Name" value={formData.name} onChange={handleUpdate} />
                            <Input type="text" name="username" size="lg" placeholder="Username" value={formData.username} onChange={handleUpdate} />
                            <Input type="email" name="email" size="lg" placeholder="Email" value={formData.email} onChange={handleUpdate} />
                            <Input type="password" name="password" size="lg" placeholder="Password" value={formData.password} onChange={handleUpdate} /> 
                        </VStack>
                        </SimpleGrid>
                        <Text as="a" href="/login">Already a member? Login here...</Text>
                        <SimpleGrid width="100%" columns={2}>
                                <Button isLoading={loading} width="100%" onClick={handleSubmit}>Submit</Button>
                                <Button onClick={handleClear} ml="3" width="95%">Clear</Button>
                            </SimpleGrid>
                    </VStack>
                </Box>
            </Box>
        </Center>
    )
}

export default Login
