import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';

const ModalComponent = ({ open, onCloseModal, title, children }) => {
    return (
        <Modal isOpen={open} onClose={onCloseModal}
            isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default ModalComponent;