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
import SignUp from "../Signup";

function SignIn() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [singup, setSignup] = useState(false);
    const toaster = useToast();

    const makeAuth = async () => {
        setLoading(true);
        await loginService.set({ username, password }
            , (response) => {
                setLoading(false);
                sessionStorage.setItem("@Fontes/auth", response.data.msg);
                sessionStorage.setItem("@Fontes/username", username);
                toaster({
                    title: "Login realizado com sucesso!",
                    description: "Usuário autenticado",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    variant: "left-accent"
                });
                window.location.href = "/";
            }
            , (error) => {
                setLoading(false);
                toaster({
                    title: "Erro ao realizar login",
                    description: "Verifique os dados fornecidos",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    variant: "left-accent"
                })
            });
    }

    if (singup) {
        return <SignUp backLogin={() => setSignup(false)} />
    } else {
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
                            { name: "Acessar", loading, onClick: () => makeAuth(), colorScheme: 'teal', variant: 'ghost' },
                            { name: "Cadastrar", loading, onClick: () => setSignup(true), colorScheme: 'purple', variant: 'text' }
                        ]}
                        data={[{
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
}

export default SignIn;
