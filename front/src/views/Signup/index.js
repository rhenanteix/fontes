import React, { useState } from "react";
import {
    Box,
    Flex,
    Button,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import Formulario from "../../components/Form";
import { loginService } from '../../services/auth.service';

function SignUp({ backLogin }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [loading, setLoading] = useState(false);
    const toaster = useToast();

    const makeUser = async () => {
        setLoading(true);
        await loginService.create({ username, password, name }
            , (response) => {
                setLoading(false);
                sessionStorage.setItem("@Fontes/auth", response.data.msg);
                sessionStorage.setItem("@Fontes/username", username);
                toaster({
                    title: "Sucesso!",
                    description: "Usuário criado com sucesso. Faça login para usar o sistema.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    variant: "left-accent"
                });
                backLogin()
            }
            , (error) => {
                setLoading(false);
                toaster({
                    title: "Erro ao realizar cadastro",
                    description: error.response.data.msg,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    variant: "left-accent"
                })
            });
    }

    return (
        <Flex position='relative' mb='40px'>
            <Flex
                minH={{ md: "1000px" }}
                h={{ sm: "initial", md: "75vh", lg: "85vh" }}
                w='100%'
                maxW='1044px'
                mx='auto'
                justifyContent='space-between'
                mb='30px'
                pt={{ md: "0px" }}>
                <Formulario
                    allowButton={true}
                    button={[
                        { name: "Criar", loading, onClick: () => makeUser(), colorScheme: 'teal', variant: 'ghost' },
                        { name: "Fazer Login", loading, onClick: () => backLogin(), colorScheme: 'purple', variant: 'text' }
                    ]}
                    data={[
                        {
                            label: "Nome", variant: 'auth', disable: loading, type: "text", size: 'lg',
                            value: name, onChange: event => setName(event.target.value)
                        },
                        {
                            label: "Username", variant: 'auth', disable: loading, type: "text", size: 'lg',
                            value: username, onChange: event => setUsername(event.target.value)
                        },
                        {
                            label: "Senha", variant: 'auth', disable: loading, type: "password", size: 'lg',
                            value: password, onChange: event => setPassword(event.target.value)
                        }]}
                />
                <Button></Button>
                <Box
                    overflowX='hidden'
                    h='100%'
                    w='100%'
                    left='0px'
                    position='absolute'
                >
                    <Box
                        w='100%'
                        h='100%'
                        bgSize='center'
                        bg='#006666'
                        opacity='0.8'></Box>
                </Box>
            </Flex>
        </Flex>
    );
}

export default SignUp;
