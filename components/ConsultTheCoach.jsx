import React, { useState, useEffect } from 'react';
import { Box, Textarea, Button, Spinner, Text, useToast, CloseButton } from '@chakra-ui/react';
import { getSuggestionFromCoach, addToAgenda, getAllSuggestionsFromCoach } from '../services/api';
import { useAuth } from './Layout';
import { TOAST_MESSAGES } from './toastMessages';

const ConsultTheCoach = () => {
  const toast = useToast();
  const { isLoggedIn, userId, onOpen } = useAuth();
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [agendaData, setAgendaData] = useState({ day: '', time: '' });
  
  useEffect(() => {
    setIsEditable(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchAllSuggestions = async () => {
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
      setSuggestion(response.suggestion.suggestion_text);
    } catch (err) {
      setError('Erreur lors de l\'obtention de la suggestion');
    }
    setLoading(false);
  };

  const addToAgendaHandler = async () => {
    try {
      const data = {
        text: suggestion,
        day: agendaData.day,
        time: agendaData.time,
        userId: userId
      };
      const response = await addToAgenda(data);
      toast({
        duration: 6000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="white" p={3} bg="#ffc107" borderRadius="md">
            <Text color="white" fontSize="xl">{TOAST_MESSAGES.SugAdded.title}</Text>
            <Text color="white" fontSize="lg">{TOAST_MESSAGES.SugAdded.description}</Text>
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
            {suggestion && (
      <>
        <Text mt={4}>{suggestion}</Text>
        <input 
          type="date" 
          value={agendaData.day} 
          onChange={(e) => setAgendaData({...agendaData, day: e.target.value})}
        />
        <input 
          type="time" 
          value={agendaData.time} 
          onChange={(e) => setAgendaData({...agendaData, time: e.target.value})}
        />
        <Button onClick={addToAgendaHandler}>Ajouter à l'agenda</Button>
      </>
    )}
    {error && <Text color="red.500">{error}</Text>}

    {allSuggestions && allSuggestions.length > 0 && (
      <Box mt={4}>
        {allSuggestions.map((suggestion, index) => (
          <Box key={index}>
            <Text>{suggestion.suggestion_text}</Text>
            <Button onClick={() => addToAgendaHandler(suggestion.suggestion_text)}>Add Suggestion</Button>
          </Box>
        ))}
      </Box>
    )}
  </Box>
);
};

export default ConsultTheCoach;