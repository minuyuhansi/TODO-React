import React, { useState } from 'react'
import { useTodo } from '../contexts/todoContext'


function TodoCard({ todo }) {

    const [isEditable, setIsEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)

    const { updateTodo, deleteTodo, completedTodo, moveUp, moveDown } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsEditable(false)
    }

    const toggleCompleted = () => {
        completedTodo(todo.id)
    }

    return (
        <div className={`max-w-2xl mx-auto rounded-3xl border border-dashed border-gray-400 p-4
    ${todo.completed ? "bg-gray-100 dark:bg-[#262626]" : "bg-white dark:bg-black/35"}`}>

            <div className="flex items-center gap-2 h-5">

                <input
                    type="checkbox"
                    className="w-5 h-5 appearance-none rounded-full border-2 border-[#f87171] dark:border-[#fca5a5] checked:bg-[#f87171] dark:checked:bg-[#fca5a5] checked:border-none cursor-pointer"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />

                {/* input field */}
                <div className={`flex-1 border rounded-2xl px-4 py-0
            ${isEditable ? "border-gray-400" : "border-transparent"}`}>
                    <input
                        type="text"
                        value={todoMsg}
                        onChange={(e) => setTodoMsg(e.target.value)}
                        className={`w-full outline-none text-2xl font-handlee font-bold 
                             ${todo.completed ? "text-gray-400 dark:text-zinc-500" : "text-black dark:text-slate-100"}`}
                        readOnly={!isEditable}
                    />
                </div>

                {/* edit btn */}
                <button
                    className={`px-4 py-1 rounded-full bg-gray-200 dark:bg-zinc-700 text-sm font-poppins
                        ${todo.completed ? "text-gray-400 dark:text-zinc-500 hover:bg-[#e5e7eb] dark:hover:bg-zinc-700 cursor-default" :
                            "text-black dark:text-slate-100 hover:bg-[#fca5a5] dark:hover:bg-[#f87171] cursor-pointer "}`}
                    onClick={() => {
                        if (isEditable) editTodo()
                        else setIsEditable(prev => !prev)
                    }}
                    disabled={todo.completed}
                >
                    {isEditable ? "Save" : "Edit"}
                </button>

                {/* up/down btn */}
                <button
                    className={`w-8 h-8 bg-gray-200 dark:bg-zinc-700 rounded-full
                     ${todo.completed ? "text-gray-400 dark:text-zinc-500 hover:bg-[#e5e7eb] dark:hover:bg-zinc-700cursor-default"
                            : "text-black dark:text-slate-100 hover:bg-[#fca5a5] dark:hover:bg-[#f87171] cursor-pointer"}`}
                    onClick={() => moveUp(todo.id)}
                    disabled={todo.completed}>
                    🡡
                </button>
                <button
                    className={`w-8 h-8 bg-gray-200 dark:bg-zinc-700 rounded-full
                     ${todo.completed ? "text-gray-400 dark:text-zinc-500 hover:bg-[#e5e7eb] dark:hover:bg-zinc-700 cursor-default" :
                            "text-black dark:text-slate-100 hover:bg-[#fca5a5] dark:hover:bg-[#f87171] cursor-pointer"}`}
                    onClick={() => moveDown(todo.id)}
                    disabled={todo.completed}>
                    🡣
                </button>

                {/* dlt btn */}
                <button
                    className="cursor-pointer hover:scale-110 transition-transform duration-100 text-lg"
                    onClick={() => deleteTodo(todo.id)}
                >
                    ❌
                </button>
            </div>
        </div>

    )
}

export default TodoCard