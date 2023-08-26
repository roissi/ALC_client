import { Box, Heading, Text, Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Box bg="#343440" minH="100vh">
      <Flex as="header" bg="#202123" color="white" p={4}>
        <Heading size="md">Artificial Life Coach</Heading>
      </Flex>
      <Box as="main" p={4}>
        {children}
      </Box>
      <Flex as="footer" bg="#a9b1bb" p={4}>
        <Text fontSize="sm">&copy; roissi / 2023</Text>
      </Flex>
    </Box>
  );
}