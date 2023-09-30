import React, { useState, useEffect } from 'react';
import { Select, Box, Textarea, Button, Spinner, Text, useToast, CloseButton } from '@chakra-ui/react';
import { getSuggestionFromCoach, addToAgenda, getAllSuggestionsFromCoach } from '../services/api';
import { useAuth } from './Layout';
import { TOAST_MESSAGES } from './toastMessages';

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

  const [selectedDay, setSelectedDay] = useState('');
  
  useEffect(() => {
    console.log("userId lors du montage du composant:", userId);
    setIsEditable(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchAllSuggestions = async () => {
      console.log("userId dans fetchAllSuggestions:", userId);
      try {
        const suggestions = await getAllSuggestionsFromCoach(userId);
        setAllSuggestions(suggestions);
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions :", error);
      }
    };
  
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
    console.log("userId dans addToAgendaHandler:", userId);
    try {
      const data = {
        text: suggestion.text,
        day: agendaData.day,
        hour: agendaData.hour,
        userId: userId,
        suggestionId: suggestionId
      };
      const response = await addToAgenda(data);
      toast({
        duration: 6000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="black" p={3} bg="#ffc107" borderRadius="md">
            <Text color="black" fontSize="xl">{TOAST_MESSAGES.SugAdded.title}</Text>
            <Text color="black" fontSize="lg">{TOAST_MESSAGES.SugAdded.description}</Text>
            <CloseButton onClick={onClose} />
          </Box>
        )
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout à l\'agenda:', error);
      toast({
        duration: 6000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="white" p={3} bg="#b63333" borderRadius="md">
            <Text color="white" fontSize="xl">{TOAST_MESSAGES.SugAddedError.title}</Text>
            <Text color="white" fontSize="lg">{TOAST_MESSAGES.SugAddedError.description}</Text>
            <CloseButton onClick={onClose} />
          </Box>
        )
      });
    }
  };

  return (
    <Box bg="tertiary" color="white" m={4} p={4} borderRadius="10px">
      <Textarea
        placeholder="What should I do today?"
        height="6em"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        _focus={{ boxShadow: "none", borderColor: "initial" }}
      />
          <Button 
            type="submit"
            bg={isEditable ? "#ffcf25" : "grey"}
            color="black"
            _hover={{ bg: isEditable ? "#ffc107" : "grey" }}
            _active={{ bg: isEditable ? "#ffc107" : "grey" }}
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
        <Text mt={4}>{suggestion.text}</Text>
        <Text mt={2}>You must choose the right time to follow this suggestion :</Text>
      <Select
          bg="#424552"
          color={selectedDay ? 'black' : '#628096'}
          border="none"
          outline="none"
          focusBorderColor="#ffc107"
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
          bg="#424552"
          color={selectedDay ? 'black' : '#628096'}
          border="none"
          outline="none"
          focusBorderColor="#ffc107"
          value={agendaData.hour} 
          onChange={(e) => setAgendaData({...agendaData, hour: e.target.value})}
        >
        <option value="" disabled>Choose an hour</option>
        <option value="8">8am</option>
        <option value="9">9am</option>
        <option value="10">10am</option>
        <option value="11">11am</option>
        <option value="0">0pm</option>
        <option value="1">1pm</option>
        <option value="2">2pm</option>
        <option value="3">3pm</option>
        <option value="4">4pm</option>
        <option value="5">5pm</option>
        <option value="6">6pm</option>
        <option value="7">7pm</option>
      </Select>
        <Button
          bg="#ffcf25"
          color="black"
          _hover={{ bg:"#ffc107"}}
          _active={{ bg:"#ffc107"}}
          mt={2}
          onClick={() => addToAgendaHandler(suggestion.id)}
        >
          Add Suggestion
        </Button>
      </>
    )}
    {error && <Text color="red.500">{error}</Text>}

{isLoggedIn && allSuggestions && allSuggestions.length > 0 && (
  <Box mt={4}>
    {allSuggestions.map((suggestion, index) => (
      <Box key={suggestion.id || index}>
        <Text>{suggestion.suggestion_text}</Text>
        <Text mt={2}>You must choose the right time to follow this suggestion :</Text>
        <Select
          bg="#424552"
          color={selectedDay ? 'black' : '#628096'}
          border="none"
          outline="none"
          focusBorderColor="#ffc107"
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
          bg="#424552"
          color={selectedDay ? 'black' : '#628096'}
          border="none"
          outline="none"
          focusBorderColor="#ffc107"
          value={agendaData.hour} 
          onChange={(e) => setAgendaData({...agendaData, hour: e.target.value})}
        >
        <option value="" disabled>Choose an hour</option>
        <option value="8">8am</option>
        <option value="9">9am</option>
        <option value="10">10am</option>
        <option value="11">11am</option>
        <option value="0">0pm</option>
        <option value="1">1pm</option>
        <option value="2">2pm</option>
        <option value="3">3pm</option>
        <option value="4">4pm</option>
        <option value="5">5pm</option>
        <option value="6">6pm</option>
        <option value="7">7pm</option>
      </Select>
      <Button bg="#ffcf25"
            color="black"
            _hover={{ bg:"#ffc107"}}
            _active={{ bg:"#ffc107"}}
            onClick={() => addToAgendaHandler(suggestion.id)}>Add Suggestion</Button>
      </Box>
    ))}
  </Box>
)}
  </Box>
);
};

export default ConsultTheCoach;