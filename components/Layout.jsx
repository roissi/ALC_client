import { Box, Heading, Text, Flex, Button, Avatar } from "@chakra-ui/react";
import { useState } from "react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // état pour savoir si l'utilisateur est connecté

  return (
    <Box bg="secondary" minH="100vh">
      <Flex as="header" bg="primary" color="white" p={4} justify="space-between" align="center">
        <Heading size="lg">Artificial Life Coach</Heading>
        <Flex>
          {!isLoggedIn ? (
        <>
          <Box mr={4}> {/* Boîte pour gérer la marge */}
            <SignUpModal setIsLoggedIn={setIsLoggedIn} />
          </Box>
            <LoginModal setIsLoggedIn={setIsLoggedIn} />
        </>
      ) : (
        <>
          <Avatar m={-2} alignSelf="center" src="url-to-generic-profile-image" mr={4} />
            <Button 
              bg="#ffcf25" 
              color="black" 
              _hover={{ bg: "#ffc107" }} 
              _active={{ bg: "#ffc107" }}
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
        </>
      )}
        </Flex>
      </Flex>
      <Box as="main" p={4}>
        {children}
      </Box>
      <Flex as="footer" bg="quaternary" p={4}>
        <Text fontSize="sm">&copy; roissi / 2023</Text>
      </Flex>
    </Box>
  );
}