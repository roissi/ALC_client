import React, { createContext, useContext, useEffect, useState } from "react";
import { Box, Heading, Text, Flex, Button, Avatar } from "@chakra-ui/react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

// Création du Context pour l'authentification
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const authValue = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Box bg="secondary" minH="100vh">
        <Flex
          as="header"
          bg="primary"
          color="white"
          p={4}
          justify="space-between"
          align="center"
        >
          <Heading size="lg">Artificial Life Coach</Heading>
          <Flex>
            {!isLoggedIn ? (
              <>
            <Box mr={4}>
              <SignUpModal setIsLoggedIn={setIsLoggedIn} />
            </Box>
                <LoginModal />
              </>
            ) : (
              <>
                <Avatar m={-2} alignSelf="center" mr={4} />
                <Button
                  bg="#ffcf25"
                  color="black"
                  _hover={{ bg: "#ffc107" }}
                  _active={{ bg: "#ffc107" }}
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("jwtToken"); // Effacer le token
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        <Box as="main" p={4}>
          {React.cloneElement(children, { isLoggedIn })}
        </Box>
        <Flex as="footer" bg="quaternary" p={4}>
          <Text fontSize="sm">&copy; roissi / 2023</Text>
        </Flex>
      </Box>
    </AuthContext.Provider>
  );
}