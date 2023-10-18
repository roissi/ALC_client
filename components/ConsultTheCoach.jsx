import React, { useState, useEffect } from 'react';
import { Select, Box, Grid, Textarea, Button, Spinner, Text, useToast, CloseButton, Image } from '@chakra-ui/react';
import { getSuggestionFromCoach, addToAgenda, getAllSuggestionsFromCoach, markSuggestionAsAddedToAgenda, deleteSuggestion } from '../services/api';
import { useAuth } from './Layout';
import { TOAST_MESSAGES } from './toastMessages';
import moment from 'moment';

const ConsultTheCoach = () => {
  const toast = useToast();
  const { isLoggedIn, userId, onOpen } = useAuth();
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState({ text: '', id: null });
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [agendaData, setAgendaData] = useState({ day: '', hour: '' });
  const [addedToAgenda, setAddedToAgenda] = useState({});
  const [selectedDay, setSelectedDay] = useState('');

  const formattedDate = moment(suggestion.createdAt).format('DD.MM.YY - HH:mm');

  useEffect(() => {
    setIsEditable(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    async function fetchAllSuggestions() {
      try {
        const suggestions = await getAllSuggestionsFromCoach(userId);
        console.log("Récupérées de l'API :", suggestions);
        const newAddedToAgenda = {};
        suggestions.forEach((sug) => {
          newAddedToAgenda[sug.id] = sug.is_added_to_agenda;
        });
        setAllSuggestions([...suggestions].reverse());
        setAddedToAgenda(newAddedToAgenda);
      } catch (err) {
        console.error('Erreur lors de la récupération des suggestions:', err);
      }
    }
    fetchAllSuggestions();
  }, [userId]);

  const askCoach = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSuggestionFromCoach(query);
      setSuggestion({ text: response.suggestion.suggestion_text, id: response.suggestion.id });
    } catch (err) {
      setError('Erreur lors de l\'obtention de la suggestion');
    }
    setLoading(false);
  };

  const addToAgendaHandler = async (suggestionId) => {
    if (!agendaData.day || !agendaData.hour) {
      toast({
        duration: 4000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="primary" p={3} bg="error" borderRadius="md">
            <Text color="primary" fontSize="xl">{TOAST_MESSAGES.ErrAdded.title}</Text>
            <Text color="primary" fontSize="lg">{TOAST_MESSAGES.ErrAdded.description}</Text>
            <CloseButton onClick={onClose} />
          </Box>
        )
      });
      return;
    }

    try {
      const data = {
        text: suggestion.text,
        day: agendaData.day,
        hour: agendaData.hour,
        userId: userId,
        suggestionId: suggestionId
      };
      const response = await addToAgenda(data);
        await markSuggestionAsAddedToAgenda(suggestionId);
      
        toast({
        duration: 6000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="primary" p={3} bg="quaternary" borderRadius="md">
            <Text color="primaryk" fontSize="xl">{TOAST_MESSAGES.SugAdded.title}</Text>
            <Text color="primary" fontSize="lg">{TOAST_MESSAGES.SugAdded.description}</Text>
            <CloseButton onClick={onClose} />
          </Box>
        )
      });

      setAddedToAgenda({ ...addedToAgenda, [suggestionId]: true });

    } catch (error) {
      console.error('Erreur lors de l\'ajout à l\'agenda:', error);
      toast({
        duration: 6000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="primary" p={3} bg="error" borderRadius="md">
            <Text color="primary" fontSize="xl">{TOAST_MESSAGES.SugAddedError.title}</Text>
            <Text color="primary" fontSize="lg">{TOAST_MESSAGES.SugAddedError.description}</Text>
            <CloseButton onClick={onClose} />
          </Box>
        )
      });
    }
  };

const deleteSuggestionHandler = async (suggestionId) => {
  try {
    await deleteSuggestion(suggestionId);
    setAllSuggestions(allSuggestions.filter(sug => sug.id !== suggestionId));
  } catch (error) {
    console.error("Could not delete entry:", error);
  }
};

  return (
    <Box bg="tertiary" color="secondary" m={4} p={4} borderRadius="10px">
      <Textarea
        placeholder="What should I do today?"
        height="6em"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        border="none"
        outline="none"
        focusBorderColor="#15b9fe"
        sx={{
          "::placeholder": {
            color: "quinary"
          }
        }}
      />
          <Button 
            type="submit"
            bg={isEditable ? "quaternary" : "senary"}
            color={isEditable ? "primary" : "primary"}
            _hover={{ bg: isEditable ? "quinary" : "senary" }}
            _active={{ bg: isEditable ? "quinary" : "senary" }}
            mt={2}
            onClick={() => {
              if (!isEditable) {
              onOpen();
              return;
              }
              askCoach();
            }}
          >
            Ask coach
          </Button>
            {loading && <Spinner />}
            {suggestion.text && (
      <>
        <Text color="secondary" mt={4}>{suggestion.text}</Text>
        <Text mt={2} color="quaternary">You must choose the right time to follow this suggestion :</Text>
      <Select
          bg="tertiary"
          color={selectedDay ? 'secondary' : 'secondary'}
          border="none"
          outline="none"
          focusBorderColor="quaternary"
          value={agendaData.day}
          onChange={(e) => setAgendaData({...agendaData, day: e.target.value})}
        >
        <option value="" disabled>Choose a day</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </Select>
      <Select
          bg="tertiary"
          color={selectedDay ? 'secondary' : 'secondary'}
          border="none"
          outline="none"
          focusBorderColor="quaternary"
          value={agendaData.hour} 
          onChange={(e) => setAgendaData({...agendaData, hour: e.target.value})}
        >
        <option value="" disabled>Choose an hour</option>
        <option value="8">8am</option>
        <option value="9">9am</option>
        <option value="10">10am</option>
        <option value="11">11am</option>
        <option value="12">0pm</option>
        <option value="13">1pm</option>
        <option value="14">2pm</option>
        <option value="15">3pm</option>
        <option value="16">4pm</option>
        <option value="17">5pm</option>
        <option value="18">6pm</option>
        <option value="19">7pm</option>
      </Select>
        <Button
          bg="quaternary"
          color="primary"
          _hover={{ bg:"quinary"}}
          _active={{ bg:"quinary"}}
          mt={2}
          onClick={() => addToAgendaHandler(suggestion.id)}
        >
          Add Suggestion
        </Button>
      </>
    )}
    {error && <Text color="red.500">{error}</Text>}

    {isLoggedIn && allSuggestions && allSuggestions.length > 0 && (
  <Grid mt={4} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
    {allSuggestions.map((suggestion, index) => (
      <Box
        key={suggestion.id || index}
        bg="tertiary"
        color="secondary"
        m={2}
        p={4}
        border="2px"
        borderColor="secondary"
        borderRadius="10px"
        flex="0 0 calc(33.333% - 4px)"
        boxShadow="md"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Text fontSize="sm" color="quaternary">{formattedDate}</Text>
        <Text color="secondary">{suggestion.suggestion_text}</Text>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            flexGrow={1}
          >
            <Box
              display="flex"
              flexDirection="column"
            >
      {addedToAgenda[suggestion.id] ? (
        <Box display="flex" alignItems="center">
          <Image src="/img/calendar_light.png" alt="Calendar" h="40px" objectFit="cover" />
        <Text ml={2} color="quaternary">Added to agenda</Text>
      </Box>
      ) : (
      <>
      <Text mt={2} color="quaternary" fontSize="sm">You must choose the right time to follow this suggestion :</Text>
      <Select
        bg="tertiary"
        color={selectedDay ? 'secondary' : 'secondary'}
        border="none"
        outline="none"
        focusBorderColor="quaternary"
        value={agendaData.day}
        onChange={(e) => setAgendaData({...agendaData, day: e.target.value})}
      >
        <option value="" disabled>Choose a day</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
        </Select>
        <Select
          bg="tertiary"
          color={selectedDay ? 'secondary' : 'secondary'}
          border="none"
          outline="none"
          focusBorderColor="quaternary"
          value={agendaData.hour}
          onChange={(e) => setAgendaData({...agendaData, hour: e.target.value})}
        >
        <option value="" disabled>Choose an hour</option>
        <option value="8">8am</option>
        <option value="9">9am</option>
        <option value="10">10am</option>
        <option value="11">11am</option>
        <option value="12">0pm</option>
        <option value="13">1pm</option>
        <option value="14">2pm</option>
        <option value="15">3pm</option>
        <option value="16">4pm</option>
        <option value="17">5pm</option>
        <option value="18">6pm</option>
        <option value="19">7pm</option>
        </Select>
        <Button
        type="button"
        bg="quaternary"
        color="primary"
        _hover={{ bg:"quinary"}}
        _active={{ bg:"quinary"}}
        size="sm"
        onClick={() => addToAgendaHandler(suggestion.id)}
      >
        Add suggestion
      </Button>
    </>
  )}
  </Box>
  <Button
    type="button"
    bg="quaternary"
    color="primary"
    _hover={{ bg:"quinary"}}
    _active={{ bg:"quinary"}}
    size="sm"
    ml={2}
    onClick={() => deleteSuggestionHandler(suggestion.id)}
  >
    Delete
  </Button>
  </Box>
</Box>
      </Box>
    ))}
  </Grid>
)}
  </Box>
  )
};

export default ConsultTheCoach;