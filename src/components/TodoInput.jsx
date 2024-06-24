import React from 'react'

function TodoInput({ handleAddTask, errorMessage, inputValue, handleInputChange, handleEnterKey }) {
    const onAddTodo = () => {
        handleAddTask();
    }
    return (
        <>
            <div className='mb-4'>
                <div className='flex  justify-center gap-2 '>

                    <div className='text-3xl lg:text-4xl font-bold font-mono'>
                        Simple Todo-List
                    </div>

                </div>
                <div className='text-center dark:text-slate-400 font-mono text-lg'>created by Mark Mallari</div>
            </div>
            <div>
                <div className='flex items-center justify-center gap-3 mt-2 mb-2'>
                    <input type="text" placeholder="Enter your Task" className={`input input-bordered w-full ${errorMessage ? 'border-red-500 focus:outline-red-500' : ''}`} value={inputValue} onChange={handleInputChange} onKeyDown={handleEnterKey} />

                    <button className='btn btn-accent flex items-center' onClick={onAddTodo}>
                        <span className='hidden lg:block'>Add Task</span>
                        <span className='text-2xl block lg:hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </button>
                </div>
                <div>
                    {errorMessage && (
                        <div className="mx-auto mb-4 text-start">
                            <span className="text-red-500">{errorMessage}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TodoInput