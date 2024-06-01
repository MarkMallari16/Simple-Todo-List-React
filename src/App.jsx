import { useState, useEffect } from 'react'
import './App.css'
import TodoListCard from './components/TodoListCard'

function App() {
  const [filter, setFilter] = useState('all');
  const [todos, setTodos] = useState(() => {
    const storedTodo = localStorage.getItem('todos');

    return storedTodo ? JSON.parse(storedTodo) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

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
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  }
  const handleEditTask = (id, newText) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });


    setTodos(updatedTodos);
  }
  const handleDeleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  }

  const handleFinishTask = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: true }
      }
      return todo;
    })
    setTodos(updatedTodos);
  }

  const numberOfTask = todos.length;

  const filterTasks = (task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'active') {
      return !task.completed;
    }
    return true;
  }
  return (
    <>
      <div className='h-screen w-full'>
        <div className='flex  justify-center gap-2 '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
          <div className='text-4xl font-bold font-mono mb-4'>
            Simple Todo-List
          </div>
        </div>

        <div>
          <div className='flex items-center justify-center gap-3 mt-2 mb-2'>
            <input type="text" placeholder="Enter your Task" className={`input input-bordered w-full ${errorMessage ? 'border-red-500 focus:outline-red-500' : ''}`} value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />

            <button className='btn btn-accent' onClick={handleAddTask}>Add +</button>

          </div>
          <div>
            {errorMessage && (
              <div className="mx-auto mb-4 text-start">
                <span className="text-red-500">{errorMessage}</span>
              </div>
            )}
          </div>
        </div>

        <div className='flex items-center justify-between  mt-10 font-medium text-2xl'>
          <div>
            <span >You have {numberOfTask} task(s)</span>
          </div>
          <div>
            <details className="dropdown ">
              <summary className="m-1 btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>

                Filter by</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-30">
                <li><a onClick={() => setFilter('all')} className={filter === 'all' ? 'bg-base-300' : ''}>All</a></li>
                <li><a onClick={() => setFilter('active')} className={filter === 'active' ? 'bg-base-300' : ''}>Active</a></li>
                <li><a onClick={() => setFilter('completed')} className={filter === 'completed' ? 'bg-base-300' : ''}>Completed</a></li>
              </ul>
            </details>

          </div>
        </div>
        {todos.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center'>
            {todos.filter(filterTasks).map((todo) => (
              <TodoListCard id={todo.id} key={todo.id} text={todo.text} createdAt={todo.createdAt} onDelete={() => handleDeleteTask(todo.id)} onEdit={(newText) => handleEditTask(todo.id, newText)}
                onFinish={() => handleFinishTask(todo.id)} completed={todo.completed} />
            ))}
          </div>
        ) : (
          <div className='flex justify-center w-full'>
            <div className='bg-base-300 rounded-lg flex flex-col  justify-center items-center py-5 w-full  mt-2 text-gray-300 gap-1'>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>

              </span>
              <h1 className='text-center flex justify-center items-center '>No tasks today!</h1>
            </div>

          </div>
        )}
      </div>
    </>
  )
}

export default App
