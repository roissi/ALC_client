import React from 'react';
import { Textarea, Button, Box } from '@chakra-ui/react';

const AgendaEntry = ({ day, hour, agendaEntries, deleteEntry }) => {
  const entryKey = `${day}-${hour}`;
  const entry = agendaEntries[entryKey];

    
  return (
    <>
      <Textarea
        value={entry?.title || ""}
        onChange={(e) => {
          // Gérer le changement de valeur du titre ici si nécessaire
        }}
        onBlur={(e) => {
          e.target.scrollTop = 0;
          // Pas d'appel à handleAgendaEntry ici
        }}
        size="md"
        fontWeight="bold"
        resize="none"
        rows="1"
        border="none"
        outline="none"
        boxShadow="none"
        mb={1}
      />
      <Textarea
        value={entry?.description || ""}
        onChange={(e) => {
          // Gérer le changement de valeur de la description ici si nécessaire
        }}
        onBlur={(e) => {
          e.target.scrollTop = 0;
          // Pas d'appel à handleAgendaEntry ici
        }}
        size="md"
        resize="none"
        rows="5"
        border="none"
        outline="none"
        boxShadow="none"
      />
        <Button
          bg="transparent"
          border="1px solid white" 
          color="white" 
          size="sm" 
          onClick={() => deleteEntry(day, hour)}
        >
        Delete
        </Button>
      </>
    );
  };
  
  export default AgendaEntry;