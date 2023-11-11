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
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  useToast,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "./Layout";
import { TOAST_MESSAGES } from "./toastMessages";

export default function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setIsLoggedIn, setUserId } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

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
            <Box color="primary" p={3} bg="quaternary" borderRadius="md">
              <Text color="primary" fontSize="xl">
                {TOAST_MESSAGES.login.title}
              </Text>
              <Text color="primary" fontSize="lg">
                {TOAST_MESSAGES.login.description}
              </Text>
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
        bg="quaternary"
        color="tertiary"
        _hover={{ bg: "quinary" }}
        _active={{ bg: "quinary" }}
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
                _focus={{
                  borderColor: "gray.600",
                  bgColor: "gray.100",
                  boxShadow: "none",
                }}
              />
            </FormControl>

            <FormControl mt={4} id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                  _focus={{
                    borderColor: "gray.600",
                    bgColor: "gray.100",
                    boxShadow: "none",
                  }}
                />
                <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePasswordVisibility}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="quaternary"
              color="tertiary"
              _hover={{ bg: "quinary" }}
              _active={{ bg: "quinary" }}
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
