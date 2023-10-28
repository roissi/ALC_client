import React, { useState, useEffect, useRef } from "react";
import { Textarea, Tooltip, Flex, Image, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "./Layout";
import { addOrUpdateAgendaEntry, deleteAgendaEntry } from "../services/api";
import { TOAST_MESSAGES } from "./toastMessages";

const AgendaEntry = ({
  day,
  hour,
  agendaEntries,
  isEditable,
  refreshAgendaEntries,
}) => {
  const entryKey = `${day}-${hour}`;
  const entry = agendaEntries[entryKey];
  const { onOpen } = useAuth();

  const descriptionRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [title, setTitle] = useState(entry?.title || "");
  const [description, setDescription] = useState(entry?.description || "");

  const showToast = (title, description, onClose) => {
    toast({
      duration: 6000,
      position: "top-right",
      isClosable: true,
      render: () => (
        <Box color="primary" p={3} bg="error" borderRadius="md">
          <Text color="primary" fontSize="xl">
            {title}
          </Text>
          <Text color="primary" fontSize="lg">
            {description}
          </Text>
          <CloseButton onClick={onClose} />
        </Box>
      ),
    });
  };

  useEffect(() => {
    if (entry) {
      setTitle(entry.title || "");
      setDescription(entry.description || "");
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
          description,
        };
        await addOrUpdateAgendaEntry(entryData);
        refreshAgendaEntries();
      } else if (!isEditable) {
        onOpen();
      }
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la mise à jour de l'entrée de l'agenda :",
        error,
      );
      showToast(
        TOAST_MESSAGES.problemAgenda.title,
        TOAST_MESSAGES.problemAgenda.description,
      );
    }
  };

  const handleDelete = async () => {
    try {
      setTitle("");
      setDescription("");

      await deleteAgendaEntry(entry?.id);
      refreshAgendaEntries();
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la suppression de l'entrée de l'agenda:",
        error,
      );
      showToast(
        TOAST_MESSAGES.problemDelete.title,
        TOAST_MESSAGES.problemDelete.description,
      );
    }
  };

  return (
    <>
      {entry?.title === "COACH SUGGESTION" ? (
        <Flex alignItems="center">
          <Image
            src="/img/brain_light.png"
            alt="Brain"
            h="30px"
            ml={0}
            mr={-2}
          />
          <Textarea
            value="FROM COACH"
            readOnly={true}
            size="md"
            color="secondary"
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
          <Image
            src="/img/calendar_light.png"
            alt="Calendar"
            h="30px"
            objectFit="cover"
            ml={0}
            mr={-3}
          />
          <Textarea
            value={title}
            onBlur={handleBlur}
            onChange={(e) => setTitle(e.target.value)}
            border="none"
            outline="none"
            rows="1"
            ml={3}
            focusBorderColor="#15b9fe"
            placeholder={title ? "" : "Title"}
            sx={{
              "::placeholder": {
                color: "quinary",
                fontSize: "1em",
              },
            }}
            style={{ fontWeight: title ? "bold" : "normal" }}
            isDisabled={!isEditable}
          />
        </Flex>
      )}

      <Flex flexDirection="column" position="relative">
        <Tooltip
          asArrow
          label={description}
          bg="tertiary"
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
            placeholder={description ? "" : "Description"}
            sx={{
              "::placeholder": {
                color: "quinary",
                fontSize: "1em",
              },
            }}
            isDisabled={!isEditable}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
        </Tooltip>

        {description && (
          <Flex position="absolute" bottom={0} left={0} zIndex={1}>
            <DeleteIcon
              color="quinary"
              h="15px"
              w="15px"
              cursor="pointer"
              onClick={handleDelete}
            />
          </Flex>
        )}
      </Flex>

      {!isEditable && (
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
};

export default AgendaEntry;
