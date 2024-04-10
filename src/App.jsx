import { useState, useRef, useEffect, useContext } from 'react'
import './App.css'
import TargetContext from './contexts/TargetContext.jsx';
import Row from './components/Row.jsx';

function App() {
  const [target, setTarget] = useState("CREAM");

  const [input, setInput] = useState();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInput = (input) => {
    setInput(input.target.value);
  }

  const handleBlur = () => {
    inputRef.current.focus();
  }

  const handleSubmit = (input) => {
    alert('submitted!');
  }

  return (
    <>
      <div className='header'>
        <h1>WORDLE</h1>
      </div>
      <div className='game'>
        <form onSubmit={handleSubmit}>
          <input autoFocus={true} ref={inputRef} onBlur={handleBlur} type='text' maxLength='5' onChange={handleInput}></input>
        </form>
        <div className='board'>
          <TargetContext.Provider value={target}>
            <Row word={input} target={target} />
            <Row />
            <Row />
            <Row />
            <Row />
          </TargetContext.Provider>
        </div>
      </div>
    </>
  )
}

export default App
