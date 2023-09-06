import React from 'react';
import { Box, Textarea, Button } from '@chakra-ui/react';

const ConsultTheCoach = () => {
  return (
    <Box bg="tertiary" color="white" m={4} p={4} borderRadius="10px">

    <Textarea
      placeholder="What should I do today?"
      height="6em"
      _focus={{ boxShadow: "none", borderColor: "initial" }}
    />
      <Button colorScheme="teal" mt={4}>
        Ask coach
      </Button>
    </Box>
  );
};

export default ConsultTheCoach;