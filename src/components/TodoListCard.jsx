import React, { useState } from 'react'
import moment from 'moment'
function TodoListCard({ id, text, createdAt, onDelete, onEdit, onFinish, completed }) {

    const formattedDate = moment().format('ddd, MMM DD  YYYY');
    const [editedText, setEditedText] = useState(text);
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveEdit = () => {
        if (editedText.trim !== '') {
            onEdit(editedText);
            setIsEditing(false);
        }
    }

    return (
        <div className={`card w-96  bg-base-200 ring-1 ring-inset ${completed ? 'ring-green-500 ' : 'ring-gray-700'} mt-5`}>
            <div className="card-body text-start ">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="input input-bordered"
                    />
                ) : (
                    <h1 className={`text-4xl font-bold text-wrap  ${completed && 'line-through w-full'} break-words`}>{text}</h1>
                )}
                <div className='flex items-center gap-2 text-gray-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>

                    <span>{formattedDate}</span>
                    {completed &&
                        <div className='flex gap-2 text-green-500 font-medium'>
                            <span> Completed</span>

                        </div>}
                </div>
            </div>
            <div className="card-actions justify-end">
                {isEditing ? (
                    <>

                        <button className="btn btn-error" onClick={() => setIsEditing(false)}>Cancel</button>
                        <button className="btn btn-success" onClick={handleSaveEdit}>Save</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-error" onClick={() => onDelete(id)} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>


                        </button>
                        {!completed && (
                            <>
                                <button className="btn btn-secondary" onClick={() => setIsEditing(true)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>

                                </button>
                                <button className="btn btn-success" onClick={() => onFinish(id)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>

                                </button>

                            </>
                        )}
                    </>
                )}
            </div>
        </div >
    )
}

export default TodoListCard