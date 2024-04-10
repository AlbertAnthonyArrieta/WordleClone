import { useState, useRef, useEffect } from 'react'
import './App.css'
import Row from './components/Row.jsx';

function App() {

  const [input, setInput] = useState();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const updateWord = (input) => {
    setInput(input.target.value);
  }

  const handleBlur = () => {
    inputRef.current.focus();
  }

  return (
    <>
      <div className='header'>
        <h1>WORDLE</h1>
      </div>
      <div className='game'>
        <input autoFocus={true} ref={inputRef} onBlur={handleBlur} type='text' maxLength='5' onChange={updateWord}></input>
        <div className='board'>
          <Row word={input}/>
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
