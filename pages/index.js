import React from 'react';
import { Box, Heading } from "@chakra-ui/react";
import Agenda from '../components/Agenda';

export default function Home() {
  return (
    <Box bg="#343440" minH="100vh" p={4}>
      <Heading as="h1" size="xl" color="white" ml={4} mb={4}>My amazing week</Heading>
      <Agenda />
    </Box>
  );
}