import React, { useState } from 'react';

const AgendaForm = ({ day, hour, onEntryCreated }) => {  // Suppression de onEntrySuccessfullyAdded
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
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
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AgendaForm;