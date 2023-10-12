import React, { useState, useEffect, useRef } from 'react';
import { Textarea, Button, Tooltip } from '@chakra-ui/react';
import { useAuth } from './Layout';
import { markSuggestionAsRemovedFromAgenda } from '../services/api';

const AgendaEntry = ({ day, hour, agendaEntries, deleteEntry, isEditable }) => {
  const entryKey = `${day}-${hour}`;
  const entry = agendaEntries[entryKey];
  const { onOpen } = useAuth();

  const descriptionRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      if (element.scrollHeight > element.clientHeight) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    }
  }, [entry?.description]);

  const handleDelete = async () => {
    console.log("Valeur de agendaEntries:", agendaEntries); // Nouveau log
    console.log("Valeur de entryKey:", entryKey); // Nouveau log
    console.log("Valeur de entry:", entry); // Nouveau log
    if (!isEditable) {
      onOpen();
      return;
    }
    deleteEntry(day, hour);

    console.log("Vérification de entry?.isSuggestion:", entry?.suggestion_id);

    // Si c'est une suggestion, mettez à jour son statut
    if (entry?.suggestion_id) {
      console.log("Avant appel à markSuggestionAsRemovedFromAgenda"); // Ajout d'un log
      await markSuggestionAsRemovedFromAgenda(entry?.suggestion_id); // Assurez-vous que cette fonction existe
      console.log("Après appel à markSuggestionAsRemovedFromAgenda"); // Ajout d'un log

    }
  };
  
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
      <Tooltip
        hasArrow label={entry?.description || ""}
        bg='primary'
        placement="auto-start"
        isOpen={isOverflowing && showTooltip}
      >
        <Textarea
        ref={descriptionRef}
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
        rows="8"
        border="none"
        outline="none"
        boxShadow="none"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      </Tooltip>
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
        onClick={handleDelete}
      >
        Delete
      </Button>
    </>
  );
};

export default AgendaEntry;