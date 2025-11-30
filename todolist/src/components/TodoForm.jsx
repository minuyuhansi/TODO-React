import React, { useState } from 'react'
import { useTodo } from '../contexts/todoContext'

function TodoForm() {

    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if (!todo) return
        addTodo({ todo, completed: false })
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex justify-center">
            <div className="relative w-1/2">
                <input
                    type="text"
                    placeholder="Type here to add Todo..."
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="w-full py-2 pl-4 pr-12 font-poppins text-[16px] rounded-full 
                    border border-black/20 outline-none bg-white/20 dark:border-white/50 
                    dark:bg-black/20 dark:placeholder:text-white/50 dark:text-slate-50
                    focus:ring-2 
                    focus:ring-[#fca5a5] dark:focus:ring-[#f87171] transition"
                />

                <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                 bg-[#fca5a5] dark:bg-[#f87171] hover:bg-[#f87171] dark:hover:bg-[#fca5a5] flex items-center justify-center
                 transition-transform duration-200 hover:scale-110 font-poppins font-semibold cursor-pointer 
                 text-white dark:text-black"
                >
                    +
                </button>
            </div>
        </form>
    )
}

export default TodoForm