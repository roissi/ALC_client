import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, CheckboxGroup, Checkbox, Input, Button, Stack, Text, Grid } from '@chakra-ui/react';
import { fetchAllInterestsAndNeeds, saveUserInterests } from '../services/api';
import { useAuth } from './Layout';

const Interests = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedNeedsMap, setSelectedNeedsMap] = useState({});
  const [selectedNeedsWithDuration, setSelectedNeedsWithDuration] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [allNeeds, setAllNeeds] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchAllData = async () => {
      const allData = await fetchAllInterestsAndNeeds();
      if (allData) {
        setAllInterests(allData.filter(d => d.type === 'Interest'));
        setAllNeeds(allData.filter(d => d.type === 'Need'));
      }
    };

    if (isLoggedIn) {
      fetchAllData();
    }
  }, [isLoggedIn]);

  const handleInterestsChange = (values) => {
    setSelectedInterests(values.map(v => parseInt(v, 10)));
  };

  const toggleNeedSelection = (needId) => {
    setSelectedNeedsMap(prev => {
      const updatedMap = { ...prev, [needId]: !prev[needId] };
      if (updatedMap[needId]) {
        setSelectedNeedsWithDuration([...selectedNeedsWithDuration, { need: parseInt(needId, 10), duration: 0 }]);
      } else {
        setSelectedNeedsWithDuration(selectedNeedsWithDuration.filter(item => item.need !== parseInt(needId, 10)));
      }
      return updatedMap;
    });
  };

  const handleDurationChange = (needId, duration) => {
    const parsedDuration = parseInt(duration, 10);
    if (isNaN(parsedDuration) || parsedDuration <= 0) return;
    setSelectedNeedsWithDuration(prev => {
      return prev.map(item => item.need === parseInt(needId, 10) ? { ...item, duration: parsedDuration } : item);
    });
  };

  const validateChoices = () => {
    if (selectedInterests.length === 0 || selectedNeedsWithDuration.length === 0) {
      alert("Veuillez sélectionner au moins un intérêt et un besoin.");
      return;
    }
    saveUserInterests(selectedInterests, selectedNeedsWithDuration)
      .then(response => console.log("Data saved successfully", response))
      .catch(error => console.log("Error saving data", error));
  };

  return (
    <Box bg="secondary" color="white" m={4} p={4} borderRadius="10px">
      <Grid templateColumns="1fr 1fr" gap={8} bg="#343440" p={3} borderRadius="10px">
        <Box bg="tertiary" p={8} borderRadius="10px">
          <Heading as="h2" size="md" mb={6}>
            Select your interests :
          </Heading>
          <CheckboxGroup value={selectedInterests} onChange={handleInterestsChange}>
            <Stack spacing={3}>
            {allInterests.map((interest, index) => (
              <Flex alignItems="center" key={"interest-" + index}>
                <Checkbox
                  value={interest.id}
                  __css={{
                '.chakra-checkbox__control': {
                    _checked: {
                    bg: "#ffc107 !important",
                    borderColor: "#ffc107 !important",
                    },
                  },
                  }}
              />
                <Text fontSize="lg" ml={2}>{interest.name}</Text>
              </Flex>
              ))}
            </Stack>
          </CheckboxGroup>
        </Box>
        
        <Box bg="tertiary" p={8} borderRadius="10px">
          <Heading as="h2" size="md" mb={6}>
            What are your most important desire or need at the moment?
          </Heading>
          <CheckboxGroup value={Object.keys(selectedNeedsMap).filter(key => selectedNeedsMap[key])} onChange={vals => vals.forEach(val => toggleNeedSelection(val))}>
            <Stack spacing={3}>
              {allNeeds.map((need, index) => (
                <Flex alignItems="center" key={"need-" + index}>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <Checkbox
                        value={need.id.toString()}
                        __css={{
                          '.chakra-checkbox__control': {
                            _checked: {
                            bg: "#ffc107 !important",
                            borderColor: "#ffc107 !important",
                            },
                          },
                        }}
                        isChecked={selectedNeedsMap[need.id] || false}
                        onClick={() => toggleNeedSelection(need.id)}
                      />
                      <Text fontSize="lg" ml={2}>{need.name}</Text>
                    </Flex>
                      {selectedNeedsMap[need.id] && (
                        <Input
                          type="number"
                          placeholder="Duration in days"
                          border="none"
                          outline="none"
                          boxShadow="none"
                          focusBorderColor="#ffc107"
                          minWidth="80x"
                          mt={2}
                          onChange={e => handleDurationChange(need.id, e.target.value)}
                        />
                      )}
                  </Flex>
                </Flex>
              ))}
            </Stack>
          </CheckboxGroup>
        </Box>
      </Grid>

      <Box bg="secondary" color="white" m={4} p={4} borderRadius="10px">
    <Button colorScheme="yellow" onClick={validateChoices}>Validate my choices</Button>
  </Box>

    </Box>
  );
};

export default Interests;