import { useState } from 'react'
import './App.css'
import MainForm from './Pages/MainForm'
// import Form from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainForm />
  )
}

export default App
