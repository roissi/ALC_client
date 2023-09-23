import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, CheckboxGroup, Checkbox, Input, Button, Stack, Text, Grid, CloseButton, useToast } from '@chakra-ui/react';
import {
  fetchAllInterestsAndNeeds,
  saveUserInterests,
  getUserInterests,
  updateUserInterests,
  deleteUserInterests
} from '../services/api';
import { useAuth } from './Layout';
import { TOAST_MESSAGES } from './toastMessages';

const Interests = () => {
  const toast = useToast();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedNeedsMap, setSelectedNeedsMap] = useState({});
  const [selectedNeedsWithDuration, setSelectedNeedsWithDuration] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [allNeeds, setAllNeeds] = useState([]);
  const { isLoggedIn, userId } = useAuth();
 
  const [choicesMade, setChoicesMade] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const allData = await fetchAllInterestsAndNeeds();
        if (allData) {
          setAllInterests(allData.filter(d => d.type === 'Interest'));
          setAllNeeds(allData.filter(d => d.type === 'Need'));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    if (isLoggedIn) {
      fetchAllData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userChoices = await getUserInterests(userId);
        const interests = userChoices.filter(choice => choice.is_permanent === true);
        const needs = userChoices.filter(choice => choice.is_permanent === false);

        if (userChoices.length > 0) {
          setSelectedInterests(interests.map(interest => interest.interest_id));
          setSelectedNeedsWithDuration(needs.map(need => ({ need: need.interest_id, duration: need.duration })));
  
          // Mise à jour de selectedNeedsMap
          const newSelectedNeedsMap = {};
          needs.forEach((need) => {
            newSelectedNeedsMap[need.interest_id] = true; // Assurez-vous que c'est la bonne clé
          });
          setSelectedNeedsMap(newSelectedNeedsMap);
  
          setChoicesMade(true);
        } else {
          setChoicesMade(false);
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des intérêts :', error);
      }
    };
  
    if (isLoggedIn && userId) {
      fetchData();
    } else {
    }
  }, [isLoggedIn, userId]);

  const handleInterestsChange = (values) => {
    setSelectedInterests(values.map(v => parseInt(v, 10)));
  };

  const toggleNeedSelection = (needId) => {
    setSelectedNeedsMap(prev => {
      const updatedMap = { ...prev, [needId]: !prev[needId] };
      if (updatedMap[needId]) {
        setSelectedNeedsWithDuration([{ need: parseInt(needId, 10), duration: 0 }]);
      } else {
        setSelectedNeedsWithDuration([]);
      }
      return updatedMap;
    });
  };

  const handleDurationChange = (needId, duration) => {
    const parsedDuration = parseInt(duration, 10);
    if (isNaN(parsedDuration) || parsedDuration <= 0) return;
    setSelectedNeedsWithDuration([{ need: parseInt(needId, 10), duration: parsedDuration }]);
  };

  const validateChoices = async () => {
    if (selectedInterests.length === 0 || selectedNeedsWithDuration.length === 0) {
      toast({
        duration: 6000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="white" p={3} bg="#b63333" borderRadius="md">
            <Text color="white" fontSize="xl">{TOAST_MESSAGES.error.title}</Text>
            <Text color="white" fontSize="lg">{TOAST_MESSAGES.error.description}</Text>
            <CloseButton onClick={onClose} />
          </Box>
        )
      });
      return;
    }
    try {
      const response = await saveUserInterests(selectedInterests, selectedNeedsWithDuration);
      setChoicesMade(true);
      toast({
        duration: 6000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="black" p={3} bg="#ffc107" borderRadius="md">
            <Text color="black" fontSize="xl">{TOAST_MESSAGES.success.title}</Text>
            <Text color="black" fontSize="lg">{TOAST_MESSAGES.success.description}</Text>
            <CloseButton onClick={onClose} />
          </Box>
        )
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des données", error);
      toast({
        duration: 6000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="white" p={3} bg="#b63333" borderRadius="md">
            <Text color="white" fontSize="xl">{TOAST_MESSAGES.problem.title}</Text>
            <Text color="white" fontSize="lg">{TOAST_MESSAGES.problem.description}</Text>
            <CloseButton onClick={onClose} />
          </Box>
        )
      });
    }
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
                <Flex direction="row" alignItems="baseline" mt={2}>
                  {choicesMade && (
                  <Text ml={2} style={{ whiteSpace: 'nowrap' }}>
                  { selectedNeedsWithDuration.find(item => item.need === need.id)?.duration || 'Not set' } days
                  </Text>
                  )}
                    <Input
                      type="number"
                      placeholder="Duration in days"
                      border="none"
                      outline="none"
                      boxShadow="none"
                      focusBorderColor="#ffc107"
                      minWidth="80px"
                      ml={4}
                      onChange={e => handleDurationChange(need.id, e.target.value)}
                    />
                </Flex>
                )}
                </Flex>
              </Flex>
              ))}
            </Stack>
          </CheckboxGroup>
        </Box>
      </Grid>

      <Box bg="secondary" color="white" m={4} p={4} borderRadius="10px">
        {choicesMade ? (
          <Flex direction="row" justifyContent="flex-start">
          <Button colorScheme="yellow" onClick={async () => { await updateUserInterests(userId, selectedInterests, selectedNeedsWithDuration); setChoicesMade(true); 
          toast({
            duration: 6000,
            position: "top-right",
            isClosable: true,
          render: ({ onClose }) => (
            <Box color="black" p={3} bg="#ffc107" borderRadius="md">
              <Text color="black">{TOAST_MESSAGES.updated.title}</Text>
              <Text color="black">{TOAST_MESSAGES.updated.description}</Text>
              <CloseButton onClick={onClose} />
            </Box>
            )
          });
        }}
          >Change my choices
          </Button>
          <Button colorScheme="yellow" ml={4} onClick={async () => { await deleteUserInterests(userId); 
          setSelectedInterests([]);
          setSelectedNeedsMap({});
          setSelectedNeedsWithDuration([]);
          setChoicesMade(false); 
          toast({
            duration: 6000,
            position: "top-right",
            isClosable: true,
          render: ({ onClose }) => (
            <Box color="black" p={3} bg="#ffc107" borderRadius="md">
              <Text color="black">{TOAST_MESSAGES.deleted.title}</Text>
              <Text color="black">{TOAST_MESSAGES.deleted.description}</Text>
              <CloseButton onClick={onClose} />
            </Box>
            )
          });
        }}
          >Reset my choices</Button>
        </Flex>
        ) : (
          <Button colorScheme="yellow" onClick={validateChoices}>Validate my choices</Button>
        )}
      </Box>
    </Box>
  );
};

export default Interests;