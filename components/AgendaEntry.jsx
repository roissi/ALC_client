import React from 'react';
import { Textarea, Button } from '@chakra-ui/react';

const AgendaEntry = ({ day, hour, agendaEntries, deleteEntry }) => {
  const entryKey = `${day}-${hour}`;
  const entry = agendaEntries[entryKey];
    
    return (
      <>
        <Textarea
          value={`${entry?.title || ""} ${entry?.description || ""}`}
          onChange={(e) => {
            // Gérer le changement de valeur ici si nécessaire
          }}
          onBlur={(e) => {
            e.target.scrollTop = 0;
            // Pas d'appel à handleAgendaEntry ici
          }}
          size="sm"
          resize="none"
          rows="6"
          border="none"
          outline="none"
          boxShadow="none"
          overflow="hidden"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
        />
        <Button colorScheme="red" size="sm" onClick={() => deleteEntry(day, hour)}>Delete</Button>
      </>
    );
  };
  
  export default AgendaEntry;