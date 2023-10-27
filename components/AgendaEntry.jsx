import React, { useState, useEffect, useRef } from 'react';
import { Textarea, Tooltip, Flex, Image, Button, useBreakpointValue } from '@chakra-ui/react';
import { useAuth } from './Layout';
import { addOrUpdateAgendaEntry } from '../services/api';
import { TOAST_MESSAGES } from './toastMessages';

const AgendaEntry = ({ day, hour, agendaEntries, isEditable, refreshAgendaEntries }) => {
  const entryKey = `${day}-${hour}`;
  const entry = agendaEntries[entryKey];
  const { onOpen } = useAuth();

  const descriptionRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const alignItems = useBreakpointValue({ base: "flex-start", md: "center" });

  const [title, setTitle] = useState(entry?.title || '');
  const [description, setDescription] = useState(entry?.description || '');

  useEffect(() => {
    if (entry) {
      setTitle(entry.title || '');
      setDescription(entry.description || '');
    }
  }, [entry]);

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [description]);

  const handleBlur = async () => {
    try {
      if (title && description && isEditable) {
        const entryData = { 
          id: entry?.id,
          day, 
          hour, 
          title, 
          description 
        };
        await addOrUpdateAgendaEntry(entryData);
        refreshAgendaEntries();
      } else if (!isEditable) {
        onOpen();
      }
    } catch (error) {
      console.error("Une erreur est survenue lors de la mise à jour de l'entrée de l'agenda :", error);
      toast({
        duration: 6000,
        position: "top-right",
        isClosable: true,
        render: ({ onClose }) => (
          <Box color="primary" p={3} bg="error" borderRadius="md">
            <Text color="primary" fontSize="xl">{TOAST_MESSAGES.problemAgenda.title}</Text>
            <Text color="primary" fontSize="lg">{TOAST_MESSAGES.problemAgenda.description}</Text>
            <CloseButton onClick={onClose} />
          </Box>
        )
      });
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
        value={title}
        onBlur={handleBlur}
        onChange={(e) => setTitle(e.target.value)}
        border="none"
        outline="none"
        rows="1"
        ml={2}
        focusBorderColor="#15b9fe"
        placeholder={title ? '' : 'Title'}
        sx={{
          "::placeholder": {
            color: "quinary",
            fontSize: "1em"
          }
        }}
        style={{ fontWeight: title ? "bold" : "normal" }}
        isDisabled={!isEditable}
      />
        </Flex>
      )}
  
      <Tooltip
        hasArrow
        label={description}
        bg='tertiary'
        color="secondary"
        placement="auto-start"
        isOpen={isOverflowing && showTooltip}
      >
        <Textarea
        ref={descriptionRef}
        value={description}
        onBlur={handleBlur}
        onChange={(e) => setDescription(e.target.value)}
        border="none"
        outline="none"
        rows="6"
        focusBorderColor="#15b9fe"
        placeholder={description ? '' : 'Description'}
        sx={{
          "::placeholder": {
            color: "quinary",
            fontSize: "1em"
          }
        }}
        isDisabled={!isEditable}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      </Tooltip>

      { !isEditable && (
        <Button
          type="submit"
          bg="senary"
          color="primary"
          _hover={{ bg: "senary" }}
          _active={{ bg: "senary" }}
          size="sm"
          mt={2}
          onClick={onOpen}
        >
          Add entry
        </Button>
      )}
  
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
        </>
      );
    }
    
    export default AgendaEntry;