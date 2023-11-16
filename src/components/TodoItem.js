import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  
  // Provide a fallback date (e.g., today's date) if todo.dueDate is undefined
  const [editedDueDate, setEditedDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  );  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setEditedDueDate(todo.dueDate ? todo.dueDate.split('T')[0] : new Date().toISOString().split('T')[0]);
  };

  const handleSave = async () => {
    try {
      const updatedTodo = {
        ...todo,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate, // Update the due date
        completed: todo.completed
      };
      await axios.put(`http://localhost:5000/todos/${todo._id}`, updatedTodo);
      setIsEditing(false);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo: ', error);
    }
  };

  const handleCheckboxChange = async () => {
    try {
      const updatedTodo = {
        ...todo,
        completed: !todo.completed
      };
      await axios.put(`http://localhost:5000/todos/${todo._id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error('Error updating completion status: ', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todo._id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo: ', error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title} - {todo.description} (Due: {new Date(todo.dueDate).toLocaleDateString()})
          </span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
