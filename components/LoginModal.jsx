import React, { useState } from "react";
import { login } from "../services/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  useToast,
  Box,
  CloseButton
} from "@chakra-ui/react";
import { useAuth } from './Layout';
import { TOAST_MESSAGES } from './toastMessages';

export default function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setIsLoggedIn, setUserId } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    if (username === "" || password === "") {
      setErrorMessage("Les champs ne peuvent pas être vides.");
      return;
    }
    
    const userData = { username, password };
    try {
      const response = await login(userData);
      if (response.token) {
        localStorage.setItem("jwtToken", response.token);
        setIsLoggedIn(true);
        setUserId(response.userId);
        toast({
          duration: 6000,
          position: "top-right",
          isClosable: true,
          render: ({ onClose }) => (
            <Box color="black" p={3} bg="#ffc107" borderRadius="md">
              <Text color="black" fontSize="xl">{TOAST_MESSAGES.login.title}</Text>
              <Text color="black" fontSize="lg">{TOAST_MESSAGES.login.description}</Text>
              <CloseButton onClick={onClose} />
            </Box>
          ),
        });
      } else {
        setErrorMessage("Échec de la connexion : " + response.message);
      }
    } catch (error) {
      setErrorMessage("Une erreur s'est produite : " + error);
    }
  };

  return (
    <>
      <Button 
        bg="white" 
        color="black" 
        _hover={{ bg: "#ffc107" }} 
        _active={{ bg: "#ffc107" }}
        onClick={onOpen}
      >
        Login
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="filled"
                _focus={{ borderColor: "gray.600", bgColor: "gray.100", boxShadow: "none" }}
              />
            </FormControl>

            <FormControl mt={4} id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                _focus={{ borderColor: "gray.600", bgColor: "gray.100", boxShadow: "none" }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button 
              bg="#ffcf25" 
              color="black" 
              _hover={{ bg: "#ffc107" }} 
              _active={{ bg: "#ffc107" }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}