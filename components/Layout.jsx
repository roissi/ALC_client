import React, { createContext, useContext, useEffect, useState } from "react";
import { Box, Heading, Flex, Button, Avatar, useDisclosure, Image, useBreakpointValue } from "@chakra-ui/react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import EntryModal from "./EntryModal";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const headingSize = useBreakpointValue({ base: "xl", md: "xl", lg: "xl", xl: "2xl", "2xl": "2xl" });
  const flexDirection = useBreakpointValue({ base: "column", md: "row", lg: "row" });
  const justifyContent = useBreakpointValue({ base: "center", md: "space-between", lg: "space-between" });
  const alignItems = useBreakpointValue({ base: "center", lg: "center" });
  const isSmOrMd = useBreakpointValue({ base: true, md: true, lg: false });


  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const authValue = {
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId,
    onOpen,
    onClose
  };

  return (
    <AuthContext.Provider value={authValue}>
      <EntryModal isOpen={isOpen} onClose={onClose} />
      <Box bg="primary" minH="100vh" borderRadius="md">
        <Flex
          as="header"
          bg="primary"
          color="primary"
          p={4}
          flexDirection={flexDirection}
          justifyContent={justifyContent}
          alignItems={alignItems}
        >
          <Flex align="center" mb={{ base: 4, md: 4, lg: 0 }}>
            <Image src="/img/logo_ALC_def.png" alt="Logo ALC" width="200px" mr={4} />
            <Heading color="secondary" size={headingSize}>
              {isSmOrMd ? (
                <>
                  Artificial <br /> Life Coach
                </>
              ) : (
                "Artificial Life Coach"
              )}
            </Heading>
          </Flex>
          <Flex>
            {!isLoggedIn ? (
              <>
                <Box mr={4} borderRadius="md">
                  <SignUpModal setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
                </Box>
                <LoginModal />
              </>
            ) : (
              <>
                <Avatar src='./img/me.jpg' m={-2} alignSelf="center" mr={4} />
                <Button
                  bg="quaternary"
                  color="tertiary"
                  _hover={{ bg: "quinary" }}
                  _active={{ bg: "quinary" }}
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserId(null);
                    localStorage.removeItem("jwtToken");
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        <Box as="main" borderRadius="md" p={4}>
          {React.cloneElement(children, { isLoggedIn, userId })}
        </Box>
      </Box>
    </AuthContext.Provider>
  );
}