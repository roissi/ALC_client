import React, { useState } from "react";
import { signUp } from "../services/api";
import {
  Avatar,
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
import { TOAST_MESSAGES } from './toastMessages';

export default function SignUpModal({ setIsLoggedIn, setUserId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    if (username === "" || email === "" || password === "") {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }
    const userData = { username, email, password };
    try {
      const response = await signUp(userData);

      if (response.token) {
        localStorage.setItem("jwtToken", response.token);
        setIsLoggedIn(true);
        setUserId(response.userId);
        setIsConnected(true);
        toast({
          duration: 6000,
          position: "top-right",
          isClosable: true,
          render: ({ onClose }) => (
            <Box color="black" p={3} bg="#ffc107" borderRadius="md">
              <Text color="black" fontSize="xl">{TOAST_MESSAGES.signup.title}</Text>
              <Text color="black" fontSize="lg">{TOAST_MESSAGES.signup.description}</Text>
              <CloseButton onClick={onClose} />
            </Box>
          ),
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Erreur côté client : " + error.response.data.error);
      } else if (error.response && error.response.status === 500) {
        setErrorMessage("Erreur du serveur : " + error.response.data.error);
      } else {
        setErrorMessage("Erreur inattendue : " + error);
      }
    }
  };
  
    return (
    <>
      {isConnected ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar name={username} src="url_de_l_avatar" />
          <Button colorScheme="red" ml={3} onClick={() => setIsConnected(false)}>
            Logout
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button 
            bg="#ffc107" 
            color="black" 
            _hover={{ bg: "#ffcf25" }} 
            _active={{ bg: "#ffcf25" }}
            onClick={onOpen}
          >
            Sign Up
          </Button>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}  {/* Affichage du message d'erreur */}
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

            <FormControl mt={4} id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}