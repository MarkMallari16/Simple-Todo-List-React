import { useState, useEffect } from 'react'
import './App.css'
import TodoListCard from './components/TodoListCard'

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodo = localStorage.getItem('todos');

    return storedTodo ? JSON.parse(storedTodo) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  const handleAddTask = () => {
    if (inputValue !== '') {
      const newTask = {
        id: Math.floor(Math.random() * 1000000),
        text: inputValue,
        createdAt: new Date().toISOString(),
        completed: false
      }

      setTodos([...todos, newTask]);

      setInputValue('');
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
  console.log(todos)
  const handleFinishTask = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: true }
      }
      return todo;
    })
    setTodos(updatedTodos);
  }

  return (
    <>
      <div className='h-screen w-full'>
        <div className='flex  justify-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
          <div className='text-4xl font-bold font-mono mb-4'>

            Simple Todo List
          </div>
        </div>

        <div className='flex items-center justify-center gap-2 mb-6'>
          <input type="text" placeholder="Enter your Task" className="input input-bordered w-full max-w-2xl" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button className='btn btn-accent' onClick={handleAddTask}>Add Task +</button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center'>
          {todos.map((todo) => (
            <TodoListCard id={todo.id} key={todo.id} text={todo.text} createdAt={todo.createdAt} onDelete={() => handleDeleteTask(todo.id)} onEdit={(newText) => handleEditTask(todo.id, newText)}
              onFinish={() => handleFinishTask(todo.id)} completed={todo.completed}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
