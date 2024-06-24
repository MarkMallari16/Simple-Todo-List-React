import { useState, useEffect } from 'react'
import './App.css'
import TodoListCard from './components/TodoListCard'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Navbar from './components/NavBar';
import TodoInput from './components/TodoInput';
import useTodos from './hooks/useTodos';


function App() {
  const { todos, sortedTodos, numberOfTask, sortOrder, filter, errorMessage, handleAddTask, handleDeleteTask, handleEditTask, handleEnterKey, handleInputChange, inputValue, } = useTodos();

  return (
    <>
      <div className='w-full mx-auto max-w-7xl p-4'>
        <Navbar />
        <TodoInput handleAddTask={handleAddTask} inputValue={inputValue} handleInputChange={handleInputChange} errorMessage={errorMessage} handleEnterKey={handleEnterKey} />

        <div className='flex items-center justify-between mt-8 font-medium'>
          <div className='text-xl lg:text-2xl'>
            <span >You have {numberOfTask} task(s)</span>
          </div>
          <div className='flex '>
            <div>
              <div className="dropdown">
                <div tabIndex={0} role='button' className="m-1 btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                  </svg>
                  <span className='hidden lg:block'>Sort by</span>
                </div>
                <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-30">
                  <li><span onClick={() => setSortOrder('ascending')} className={sortOrder === 'ascending' ? 'bg-base-300' : ''}>Ascending</span></li>
                  <li><span onClick={() => setSortOrder('descending')} className={sortOrder === 'descending' ? 'bg-base-300' : ''}>Descending</span></li>
                </ul>
              </div>
            </div>
            <div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role='button' className="m-1 btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                  </svg>

                  <span className='hidden lg:block'>Filter by</span></div>
                <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-30">
                  <li><span onClick={() => setFilter('all')} className={filter === 'all' ? 'bg-base-300' : ''}>All</span></li>
                  <li><span onClick={() => setFilter('active')} className={filter === 'active' ? 'bg-base-300' : ''}>Active</span></li>
                  <li><a onClick={() => setFilter('completed')} className={filter === 'completed' ? 'bg-base-300' : ''}>Completed</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
        {todos.length > 0 ? (
          <div className='mt-5'>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} >
              <Masonry columnsCount={3} gutter='20px'>
                {sortedTodos.map((todo) => (
                  <TodoListCard id={todo.id} key={todo.id} text={todo.text} createdAt={todo.createdAt} onDelete={() => handleDeleteTask(todo.id)} onEdit={(newText) => handleEditTask(todo.id, newText)}
                    onFinish={() => handleFinishTask(todo.id)} completed={todo.completed} />
                ))}
              </Masonry>
            </ResponsiveMasonry>

          </div>
        ) : (
          <div className='flex justify-center w-full'>
            <div className='bg-base-300 rounded-lg flex flex-col justify-center items-center py-5 w-full  mt-2  gap-1'>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>

              </span>
              <h1 className='text-center flex justify-center items-center '>No tasks today!</h1>
            </div>

          </div>
        )}

      </div >


    </>

  )
}

export default App
