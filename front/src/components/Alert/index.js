import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
}
    from '@chakra-ui/react';

const Alert = ({ open, onCloseAlert, title, description, buttonName, onClickButton }) => {
    return (

        <AlertDialog
            isOpen={open}
            onClose={onCloseAlert}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {description}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onCloseAlert}>
                            Cancelar
                        </Button>
                        <Button colorScheme='red' onClick={onClickButton} ml={3}>
                            {buttonName}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}

export default Alert;