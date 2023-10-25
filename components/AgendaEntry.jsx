import React, { useState, useEffect, useRef } from 'react';
import { Textarea, Button, Tooltip, Flex, Image, useBreakpointValue } from '@chakra-ui/react';
import { useAuth } from './Layout';
import { markSuggestionAsRemovedFromAgenda } from '../services/api';

const AgendaEntry = ({ day, hour, agendaEntries, deleteEntry, isEditable, handleCellClick }) => {
  const entryKey = `${day}-${hour}`;
  const entry = agendaEntries[entryKey];
  const { onOpen } = useAuth();

  const descriptionRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const alignItems = useBreakpointValue({ base: "flex-start", md: "center" });
  
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

  const handleAddClick = () => {
    if (!isEditable) {
      onOpen();
      return;
    }
    // Ici, nous utilisons une fonction pour gérer le clic sur "Add entry"
    // Elle définira la cellule sélectionnée, ce qui déclenchera l'affichage du formulaire
    handleCellClick(day, hour);
  };

  const handleDelete = async () => {
    if (!isEditable) {
      onOpen();
      return;
    }
    deleteEntry(day, hour);

    if (entry?.suggestion_id) {
      await markSuggestionAsRemovedFromAgenda(entry?.suggestion_id);

    }
  };
  
  return (
    <>
      {entry?.title === 'COACH SUGGESTION' ? (
    <Flex direction={flexDirection} alignItems={alignItems}>
        <Image src="/img/brain_light.png" alt="Brain" boxSize="30px" ml={3} mr={-2} />
        <Textarea
          value='FROM COACH'
          readOnly={true}
          size="md"
          color='secondary'
          fontWeight="bold"
          resize="none"
          rows="1"
          border="none"
          outline="none"
          boxShadow="none"
          mb={1}
        />
    </Flex>
) : (
    <Flex alignItems="center">
      <Image src="/img/calendar_light.png" alt="Calendar" h="30px" objectFit="cover" ml={3} mr={-1} />
      <Textarea
        value={entry?.title || ""}
        onChange={(e) => {
        }}
        onBlur={(e) => {
          e.target.scrollTop = 0;
        }}
        size="md"
        resize="none"
        fontWeight="bold"
        rows="1"
        border="none"
        outline="none"
        boxShadow="none"
        mb={1}
    />
    </Flex>
)}
      <Tooltip
        hasArrow label={entry?.description || ""}
        bg='tertiary'
        color="secondary"
        placement="auto-start"
        isOpen={isOverflowing && showTooltip}
      >
        <Textarea
        ref={descriptionRef}
        value={entry?.description || ""}
        onChange={(e) => {
        }}
        onBlur={(e) => {
          e.target.scrollTop = 0;
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
      <>
      {entry ? (
        <Button 
        type="button"
        bg={isEditable ? "quaternary" : "senary"}
        color={isEditable ? "primary" : "primary"}
        _hover={{ bg: isEditable ? "quinary" : "senary" }}
        _active={{ bg: isEditable ? "quinary" : "senary" }}
        size="sm"
        mt={2}
        onClick={handleDelete}
      >
        Delete
      </Button>
      ) : (
      <Button 
        type="button"
        bg={isEditable ? "quaternary" : "senary"}
        color={isEditable ? "primary" : "primary"}
        _hover={{ bg: isEditable ? "quinary" : "senary" }}
        _active={{ bg: isEditable ? "quinary" : "senary" }}
        size="sm"
        mt={2}
        onClick={handleAddClick}
      >
        Add entry
      </Button>
      )}
      </>
    </>
  );
};

export default AgendaEntry;