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
    bg="#424552"
    color="white"
    border="none"
    outline="none"
    focusBorderColor="#ffc107"
  />
  <Input
    type="text"
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    bg="#424552"
    color="white"
    border="none"
    outline="none"
    focusBorderColor="#ffc107"
  />
    <Button 
      type="submit"
      bg={isEditable ? "#ffcf25" : "grey"}
      color="black"
      _hover={{ bg: isEditable ? "#ffc107" : "grey" }}
      _active={{ bg: isEditable ? "#ffc107" : "grey" }}
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