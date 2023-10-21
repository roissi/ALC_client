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

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Privacy Policy</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <List spacing={3}>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Introduction</Text>
                        </Flex>
                            <Text>Welcome to “Artificial Life Coach”. This privacy policy aims to inform site users about how their personal data is collected, used and protected.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Data gathering</Text>
                        </Flex>
                            <Text>Since “Artificial Life Coach” is a fictitious site, no personal data is collected, stored or processed.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Cookies</Text>
                        </Flex>
                            <Text>The “Artificial Life Coach” application does not use cookies, given its fictitious nature and not intended for production use.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">External links</Text>
                        </Flex>
                            <Text>Our site may contain links to external sites. These sites have their own privacy policies and I am not responsible for their operations. It is recommended that you read the privacy policy of the sites you visit.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Security</Text>
                        </Flex>
                            <Text>Even if “Artificial Life Coach” is a fictitious site, I would like to reassure my users that the security of their information is a priority. Every precaution is taken to protect the data, even if in this context no real data is processed.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Privacy Policy Changes</Text>
                        </Flex>
                            <Text>This privacy policy may be updated. However, given the fictional nature of the “Artificial Life Coach” application, these modifications are unlikely.</Text>
                    </ListItem>
                    <ListItem>
                        <Flex align="center">
                            <ListIcon as={WarningTwoIcon} color="quaternary" />
                            <Text fontWeight="bold">Contact</Text>
                        </Flex>
                            <Text>If you have any questions regarding this privacy policy, you can contact me here : <a className="email" href="mailto:cyrildegraeve@gmail.com" style={{ color: '#15b9fe' }}>cyrildegraeve@gmail.com</a></Text>
                    </ListItem>
                </List>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PrivacyPolicyModal;