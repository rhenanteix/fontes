import React from 'react';
import {
    Input, useColorModeValue, Button, Flex, FormControl,
    FormLabel
} from '@chakra-ui/react';
import './style.css';

const Form = ({ data, button, allowButton }) => {

    const bgForm = useColorModeValue("white", "navy.800");

    return (
        <Flex
            w='100%'
            h='100%'
            alignItems='center'
            justifyContent='center'
            mb='60px'
            mt={{ base: "50px", md: "20px" }}>
            <Flex
                zIndex='2'
                direction='column'
                w='445px'
                background='transparent'
                borderRadius='15px'
                p='40px'
                mx={{ base: "100px" }}
                m={{ base: "20px", md: "auto" }}
                bg={bgForm}
                boxShadow={useColorModeValue(
                    "0px 5px 14px rgba(0, 0, 0, 0.05)",
                    "unset"
                )}>
                <FormControl>
                    {data.map((element, index) => {
                        return (
                            <>
                                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                    {element.label}
                                </FormLabel>
                                <Input
                                    variant={element.variant}
                                    fontSize='sm'
                                    border={'1px'}
                                    ms='4px'
                                    disabled={element.disable}
                                    type={element.type}
                                    placeholder={element.label}
                                    mb='24px'
                                    size={element.size}
                                    value={element.value}
                                    onChange={element.onChange}
                                />
                            </>
                        )
                    })}
                    {allowButton ?
                        button.map((element, index) => {
                            return (
                                < Button key={index}
                                    colorScheme={element.colorScheme}
                                    variant={element.variant}
                                    isLoading={element.loading}
                                    onClick={element.onClick}
                                    w='100%'
                                    h='45'
                                    mb='24px'>
                                    {element.name}
                                </Button>
                            )
                        }) : null}
                </FormControl>
            </Flex>
        </Flex >
    )

}

export default Form;