import React, { useState } from 'react';
import { Button, Input } from "@chakra-ui/react";
import { useAuth } from './Layout';

const AgendaForm = ({ day, hour, onEntryCreated, isEditable }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { onOpen } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditable) {
      onOpen();
      return;
    }

    const newEntry = {
      title,
      description,
      day,
      hour
    };
    
    onEntryCreated(newEntry);
  };

  return (
<form onSubmit={handleSubmit}>
  <Input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    bg="tertiary"
    color="secondary"
    border="none"
    outline="none"
    focusBorderColor="quaternary"
    sx={{
      "::placeholder": {
        color: "quinary"
      }
    }}
  />
  <Input
    type="text"
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    bg="tertiary"
    color="secondary"
    border="none"
    outline="none"
    focusBorderColor="quaternary"
    sx={{
      "::placeholder": {
        color: "quinary"
      }
    }}
  />
    <Button 
      type="submit"
      bg={isEditable ? "quaternary" : "senary"}
      color={isEditable ? "primary" : "primary"}
      _hover={{ bg: isEditable ? "quinary" : "senary" }}
      _active={{ bg: isEditable ? "quinary" : "senary" }}
      size="sm"
      mt={2}
      onClick={() => {
        if (!isEditable) {
          onOpen();
        return;
        }
    }}
  >
        Add or update entry
  </Button>
</form>
);
};

export default AgendaForm;