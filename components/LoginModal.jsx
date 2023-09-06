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
} from "@chakra-ui/react";

export default function LoginModal({ setIsLoggedIn }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (username === "" || password === "") {
      setErrorMessage("Les champs ne peuvent pas être vides.");
      return;
    }
    
    const userData = { username, password };
    try {
      const response = await login(userData);  // Utilisez la fonction login de api.js
      if (response.token) {
        localStorage.setItem("jwtToken", response.token);
        setIsLoggedIn(true);
        onClose();
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
            {errorMessage && <Text color="red.500">{errorMessage}</Text>} {/* Affichage du message d'erreur */}
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