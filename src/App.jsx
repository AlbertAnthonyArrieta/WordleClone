import { useState } from 'react'
import './App.css'
import Row from './components/Row.jsx';

function App() {
  const [count, setCount] = useState(0)
// Just finished making row component
  return (
    <>
      <div className='header'>
        <h1>WORDLE</h1>
      </div>
      <div className='game'>
        <div className='board'>
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
        </div>
      </div>
    </>
  )
}

export default App
