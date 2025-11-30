import { useEffect, useState } from 'react'
import './App.css'
import ThemeBtn from './components/ThemeBtn'
import { ThemeProvider } from './contexts/theme'
import { TodoProvider } from './contexts/todoContext'
import TodoForm from './components/TodoForm'
import TodoCard from './components/TodoCard'

function App() {
  const [themeMode, setThemeMode] = useState('light')
  const [todos, setTodos] = useState([])

  const darkTheme = () => {
    setThemeMode('dark')
  }

  const lightTheme = () => {
    setThemeMode('light')
  }

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const completedTodo = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      ))
  }

  const moveUp = (id) => {
    setTodos(prev => {
      const idx = prev.findIndex(t => t.id === id);
      if (idx <= 0) return prev;
      const updated = [...prev];
      [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
      return updated;
    });
  };

  const moveDown = (id) => {
    setTodos(prev => {
      const idx = prev.findIndex(t => t.id === id);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      const updated = [...prev];
      [updated[idx + 1], updated[idx]] = [updated[idx], updated[idx + 1]];
      return updated;
    });
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light')
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"))
    if (saved && saved.lenght > 0) {
      setTodos(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, completedTodo, moveUp, moveDown }}>
        <div className="bg-slate-100 dark:bg-black/85 w-full min-h-screen">
          <div className="absolute top-4 right-4">
            <ThemeBtn />
          </div>
          <h1
            className='text-4xl font-extrabold text-center text-black dark:text-white font-handlee pt-10 mb-5'>
            To-do List 𓂃🖊
          </h1>

          <div className='mb-4'>
            <TodoForm />
          </div>
          <div className="flex flex-wrap justify-center gap-3 p-4 w-full">
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoCard todo={todo} />
              </div>
            ))}
          </div>

        </div>
      </TodoProvider>
    </ThemeProvider>
  )
}

export default App
