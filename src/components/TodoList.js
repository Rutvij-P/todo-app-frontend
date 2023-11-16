import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Move fetchTodos outside of useEffect
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  const [sortPref, setSortPref] = useState('dueDate');

  useEffect(() => {
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/todos?sort=${sortPref}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  fetchTodos();
}, [sortPref]);

  return (
    <div>
        <select value={sortPref} onChange={(e) => setSortPref(e.target.value)}>
            <option value="dueDate">Due Date</option>
            <option value="createdAt">Creation Date</option>
        </select>
        <h2>To-Do Tasks of the Day</h2>
            {todos.filter(todo => !todo.completed).map(todo => (
            <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
            ))}

            <h2>Completed Tasks of the Day</h2>
            {todos.filter(todo => todo.completed).map(todo => (
            <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
            ))}
    </div>
);
};

export default TodoList;
