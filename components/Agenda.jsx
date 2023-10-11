import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import AgendaForm from './AgendaForm';
import AgendaEntry from './AgendaEntry';
import { Box, Text, useToast, CloseButton } from "@chakra-ui/react";
import { createAgendaEntry, fetchAgendaEntries, updateAgendaEntry, deleteAgendaEntry } from '../services/api';
import { useAuth } from './Layout';
import { TOAST_MESSAGES } from './toastMessages';

const Agenda = () => {
  const toast = useToast();
  const { isLoggedIn } = useAuth();
  const [isEditable, setIsEditable] = useState(isLoggedIn);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);
  
  const [selectedCell, setSelectedCell] = useState(null);
  const [agendaEntries, setAgendaEntries] = useState({});
  const [firstEntryAdded, setFirstEntryAdded] = useState(false);

  useEffect(() => {
    setIsEditable(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const initAgenda = async () => {
      const token = localStorage.getItem('jwtToken');
      
      if (token) {
        try {
          const decoded = jwt_decode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            localStorage.removeItem('jwtToken');
          } else {
            await refreshAgendaEntries();
          }
        } catch (error) {
          localStorage.removeItem('jwtToken');
          console.error("Invalid or expired token:", error);
        }
      } else {
        setAgendaEntries({});
      }
    };

    if (isLoggedIn) {
      refreshAgendaEntries();
    } else {
      initAgenda();
    }
  }, [isLoggedIn]);

  const DigitalClock = ({ hour }) => {
    return (
      <span style={{ fontFamily: 'Digital-7 Mono, monospace', fontSize: '1.2em' }}>
        {hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
      </span>
    );
  };

  const handleCellClick = (day, hour) => {
    setSelectedCell({ day, hour });
  };

  const refreshAgendaEntries = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const data = await fetchAgendaEntries(token);
        const formattedData = data.reduce((acc, entry) => {
          const key = `${entry.day}-${entry.hour}`;
          acc[key] = entry;
          return acc;
        }, {});
        setAgendaEntries(formattedData);
      } catch (error) {
        console.error("Could not refresh agenda entries:", error);
      }
    }
  };

  const addAgendaEntry = async (day, hour, entry, token) => {
    const newEntry = {
      title: entry.title,
      description: entry.description,
      day,
      hour
    };
    try {
      await createAgendaEntry(newEntry, token);
      refreshAgendaEntries();
      if (!firstEntryAdded) {
        toast({
          duration: 6000,
          position: "top-right",
          isClosable: true,
          render: ({ onClose }) => (
            <Box color="black" p={3} bg="#ffc107" borderRadius="md">
              <Text color="black" fontSize="xl">{TOAST_MESSAGES.entry.title}</Text>
              <Text color="black" fontSize="lg">{TOAST_MESSAGES.entry.description}</Text>
              <CloseButton onClick={onClose} />
            </Box>
          ),
        });
        setFirstEntryAdded(true);
      }
  
    } catch (error) {
      console.error("Could not add entry:", error);
    }
  };
  
  const updateAgendaEntries = async (day, hour, newEntry, id, token) => {
    const updatedEntry = {
      day,
      hour,
      title: newEntry.title,
      description: newEntry.description,
      id
    };
  
    try {
      await updateAgendaEntry(updatedEntry, token);
      setAgendaEntries(prevState => ({
        ...prevState,
        [`${day}-${hour}`]: updatedEntry
      }));
    } catch (error) {
      console.error("Could not update entry:", error);
    }
  };

  
  const handleAgendaEntry = async (day, hour, entry) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const entryKey = `${day}-${hour}`;
      if (agendaEntries.hasOwnProperty(entryKey)) {
        const id = agendaEntries[entryKey].id;
        await updateAgendaEntries(day, hour, entry, id, token);
      } else {
        await addAgendaEntry(day, hour, entry, token);
      }
    }
  };

  const deleteEntry = async (day, hour) => {
    const token = localStorage.getItem('jwtToken');
    const entryKey = `${day}-${hour}`;
    const entryId = agendaEntries[entryKey]?.id;

    if (token && entryId !== undefined) {
      try {
        await deleteAgendaEntry(entryId, token);
        refreshAgendaEntries();
      } catch (error) {
        console.error("Could not delete entry:", error);
      }
    }
  };

  return (
    <Box bg="tertiary" color="white" borderColor="white" m={4} p={4} borderRadius="10px">
      <Box display="flex" mb={2}>
        <Box width="70px" bg="tertiary" p={2} ml={2}></Box>
        {days.map((day, idx) => (
          <Box flex="1" bg="tertiary" p={2} key={idx} ml={1} borderRadius="md">
            <Text color="white" fontSize="xl">{day}</Text>
          </Box>
        ))}
      </Box>
      {hours.map((hour, idx) => (
        <Box display="flex" key={idx} mb={4}>
          <Box width="70px" bg="tertiary" p={2} borderRadius="md">
            <Text color="white">
              <DigitalClock hour={hour} />
            </Text>
          </Box>
          {days.map((day, idx) => (
            <Box
              flex="1"
              borderColor="quaternary"
              borderWidth="1px"
              p={2}
              key={idx}
              ml={4}
              borderRadius="md"
              minHeight="120px"
              onClick={() => handleCellClick(day, hour)}
            >
              {selectedCell && selectedCell.day === day && selectedCell.hour === hour ? (
                <AgendaForm 
                  day={selectedCell.day} 
                  hour={selectedCell.hour} 
                  onEntryCreated={(newEntry) => handleAgendaEntry(newEntry.day, newEntry.hour, newEntry)}
                  isEditable={isEditable}
                />
              ) : (
                <AgendaEntry 
                  day={day} 
                  hour={hour}
                  agendaEntries={agendaEntries} 
                  deleteEntry={deleteEntry} 
                  isEditable={isEditable}
                />
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Agenda;