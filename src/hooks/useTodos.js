import React, { useEffect, useState } from 'react'

function useTodos() {
  const getInitialTodos = () => {
    try {
      const storedTodo = localStorage.getItem('todos');

      return storedTodo ? JSON.parse(storedTodo) : [];

    } catch (error) {
      return [];
    }
  }

  const getInitialFilter = () => {
    const storedFilter = localStorage.getItem('filteredTodos');
    try {
      return storedFilter ? JSON.parse(storedFilter) : 'all';
    } catch (error) {
      return 'all';
    }
  }
  const getInitialOrder = () => {
    try {
      const sortTodos = localStorage.getItem('sortTodos');
      return sortTodos ? JSON.parse(sortTodos) : 'descending';
    } catch (error) {
      return 'ascending'
    }
  }

  const [todos, setTodos] = useState(getInitialTodos());
  const [filter, setFilter] = useState(getInitialFilter());
  const [sortOrder, setSortOrder] = useState(getInitialOrder());

  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('filteredTodos', JSON.stringify(filter));
    localStorage.setItem('sortTodos', JSON.stringify(sortOrder));

  }, [todos, sortOrder, filter]);


  //handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;

    setInputValue(value);

    if (value.trim() === '') {
      setErrorMessage('You must input a task description!');
    } else if (value.trim().length < 3) {
      setErrorMessage('Task description must be at least 3 characters long.');
    } else {
      setErrorMessage('');
    }
  }
  //handle add task
  const handleAddTask = () => {
    const trimmedInputValue = inputValue.trim();

    if (trimmedInputValue.length === 0) {
      setErrorMessage('You must input a task description!');
      return;
    }

    if (trimmedInputValue.length < 3) {
      setErrorMessage('Task description must be at least 3 characters long.');
      return;
    }

    const newTask = {
      id: Math.floor(Math.random() * 1000000),
      text: inputValue,
      createdAt: new Date().toISOString(),
      completed: false
    }

    setTodos([...todos, newTask]);

    setInputValue('');
    setErrorMessage('');
    setFilter('all');
  }
  //This will handle key when user press 'Enter'
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
      setFilter('all');
    }
  }
  //This will handle edit task
  const handleEditTask = (id, newText) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText, createdAt: new Date().toISOString() };
      }
      return todo;
    });


    setTodos(updatedTodos);
  }
  //This will handle delete task
  const handleDeleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  }
  //This will handle finish task
  const handleFinishTask = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: true }
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  //Getting the number of task using todos.length
  const numberOfTask = todos.filter(todo => !todo.completed).length;

  //This will filtered the task
  const filterTasks = (todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  }

  //This will sort by date 
  const sortedTodos = todos.filter(filterTasks).sort((a, b) => sortOrder === 'ascending' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt));

  return {
    todos,
    filter,
    sortOrder,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleFinishTask,
    sortedTodos,
    setFilter,
    setSortOrder,
    numberOfTask,
  };
}

export default useTodos