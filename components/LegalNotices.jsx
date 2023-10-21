import {
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    List,
    ListItem,
    ListIcon
} from "@chakra-ui/react";
import { WarningTwoIcon } from '@chakra-ui/icons';

const LegalNoticesModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Legal Notices</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <List spacing={3}>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">General Informations</Text>
                        </Flex>
                            <Text>The “Artificial Life Coach” application is created as part of a personal project and is not a real website (for now)...</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Intellectual Property</Text>
                        </Flex>
                            <Text>The content of the “Artificial Life Coach” application, including but not limited to texts, images, logos, trademarks and graphic elements, are created for personal purposes and are not intended for be used outside the scope of the project. Any use outside the context of the personal project is strictly prohibited.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Collection of Personal Data</Text>
                        </Flex>
                            <Text>Since the “Artificial Life Coach” application is fictitious and is not intended to be used in a production context, no personal data is collected.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Use of Cookies</Text>
                        </Flex>
                            <Text>Since the “Artificial Life Coach” application is fictitious and is not intended to be used in a production context, no use of cookies is made.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">External Links</Text>
                        </Flex>
                            <Text>The “Artificial Life Coach” application being fictitious, it does not contain external links, except, for promotional purposes, to pages linked to the creator of the project.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Responsability</Text>
                        </Flex>
                            <Text>The “Artificial Life Coach” application is created for personal purposes only and has no legal or commercial value. The information provided on the site is fictitious and should not be considered professional advice. Users of the site should use their own discretion and not rely on information on the site to make decisions in a real-world context.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Changes to Legal Notices</Text>
                        </Flex>
                            <Text>Since the “Artificial Life Coach” application is fictitious, the legal notices are not intended to be modified.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Applicable Law and Competent Jurisdiction</Text>
                        </Flex>
                            <Text>Since the “Artificial Life Coach” application is fictitious, no applicable law or competent jurisdiction applies.</Text>
                    </ListItem>
                </List>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LegalNoticesModal;