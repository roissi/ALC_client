import React, { useState } from 'react';
import { Button, Input } from "@chakra-ui/react";

const AgendaForm = ({ day, hour, onEntryCreated, isEditable }) => {  // Suppression de onEntrySuccessfullyAdded
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      title,
      description,
      day,
      hour
    };
    
    // Informer le composant parent que l'entrée doit être créée ou mise à jour
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
    isReadOnly={!isEditable}
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
    isReadOnly={!isEditable}
  />
  <Button 
    type="submit"
    bg="#ffcf25"
    color="black"
    _hover={{ bg: "#ffc107" }}
    _active={{ bg: "#ffc107" }}
    size="sm"
    mt={2}
    isDisabled={!isEditable}>
      Add or update entry
  </Button>
</form>
);
};

export default AgendaForm;