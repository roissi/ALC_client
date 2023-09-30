import React from 'react';
import { Textarea, Button } from '@chakra-ui/react';
import { useAuth } from './Layout';

const AgendaEntry = ({ day, hour, agendaEntries, deleteEntry, isEditable }) => {
  const entryKey = `${day}-${hour}`;
  const entry = agendaEntries[entryKey];
  const { onOpen } = useAuth();
  
  return (
    <>
      <Textarea
        value={entry?.isSuggestion ? 'Coach suggestion' : entry?.title || ""}
        readOnly={entry?.isSuggestion}
        onChange={(e) => {
          // Gérer le changement de valeur du titre ici si nécessaire
        }}
        onBlur={(e) => {
          e.target.scrollTop = 0;
          // Pas d'appel à handleAgendaEntry ici
        }}
        size="md"
        color={entry?.isSuggestion ? '#ffc107' : 'inherit'}
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
      {entry?.suggestion_text && (
        <Textarea
          value={entry?.suggestion_text}
          size="md"
          resize="none"
          rows="5"
          border="none"
          outline="none"
          boxShadow="none"
        />
      )}
      <Button 
        type="button"
        bg={isEditable ? "transparent" : "grey"}
        color={isEditable ? "white" : "black"}
        border={isEditable ? "1px solid white" : "none"}
        _hover={{ bg: isEditable ? "transparent" : "grey" }}
        _active={{ bg: isEditable ? "transparent" : "grey" }}
        size="sm"
        mt={2}
        onClick={() => {
          if (!isEditable) {
            onOpen();
            return;
          }
          deleteEntry(day, hour);
        }}
      >
        Delete
      </Button>
    </>
  );
};

export default AgendaEntry;