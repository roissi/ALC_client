import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons'
import { css, keyframes } from '@emotion/react';

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blinkingCursor = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: #15b9fe; }
`;

const typingStyles = css`
  width: 0;
  white-space: nowrap;
  overflow: hidden;
  border-right: .15em solid #15b9fe;
  animation: ${typing} 4s steps(40, end), ${blinkingCursor} 0.5s step-end infinite;
  animation-fill-mode: forwards;
`;

const EntryModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to Artificial Life Coach!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="black" mb={4}>
            Unlock the full potential of Artificial Life Coach by signing up or logging in.
          </Text>
          <Box backgroundColor="gray.50" borderRadius="md" p={4}>
            <Text fontWeight="bold" color="black" mb={2}>Benefits:</Text>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={CheckIcon} color="#15b9fe"/>
                Unique life coaching
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="#15b9fe"/>
                Personalized recommendations
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="#15b9fe"/>
                A customizable diary
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="#15b9fe"/>
                A free experience
              </ListItem>
            </List>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Text color="black" css={typingStyles} fontWeight="bold">
            Ready to take the next step in your personal growth journey?
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EntryModal;