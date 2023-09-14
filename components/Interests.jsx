import React, { useState } from 'react';
import { Box, Heading, CheckboxGroup, Checkbox, Stack } from '@chakra-ui/react';

const Interests = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const allInterests = ['Technologie', 'Sport', 'Musique', 'Voyage', 'Cinéma'];

  const handleChange = (values) => {
    setSelectedInterests(values);
  };

  return (
    <Box bg="tertiary" color="white" m={4} p={4} borderRadius="10px">

      <CheckboxGroup value={selectedInterests} onChange={handleChange}>
        <Stack spacing={3}>
          {allInterests.map((interest, index) => (
            <Checkbox key={index} colorScheme="teal">
              {interest}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

export default Interests;