import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTodo = { title, description, dueDate };
      await axios.post('http://localhost:5000/todos', newTodo);
      setTitle('');
      setDescription('');
      // Optional: Fetch todos again to update the list
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
  />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
