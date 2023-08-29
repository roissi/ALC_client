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
} from "@chakra-ui/react";

export default function SignUpModal({ setIsLoggedIn }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (username === "" || email === "" || password === "") {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }
    const userData = { username, email, password };
    try {
      const response = await signUp(userData); // Utilisez la fonction signUp de api.js
      if (response.token) {
        localStorage.setItem("jwtToken", response.token);
        setIsLoggedIn(true);
        setIsConnected(true);
        onClose();
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
          <Button colorScheme="teal" onClick={onOpen}>
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
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>

            <FormControl mt={4} id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl mt={4} id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}