import { useState, useRef, useEffect, useContext } from 'react'
import './App.css'
import TargetContext from './contexts/TargetContext.jsx';
import Row from './components/Row.jsx';

function App() {
  const [target, setTarget] = useState("CREAM");

  const [input, setInput] = useState();

  const [activeRow, setActiveRow] = useState(0);

  const [attempts, setAttempts] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttempts([...attempts, event.target.answer.value.toUpperCase()]);
    setActiveRow(activeRow + 1);
    event.target.answer.value = '';
    setInput('');
    console.log(attempts);
  }

  // attempts are now saving, but ghost is being saved all the time and something wrong with the activeRow

  return (
    <>
      <div className='header'>
        <h1>WORDLE</h1>
      </div>
      <div className='game'>
        <form onSubmit={handleSubmit}>
          <input name="answer" autoFocus={true} ref={inputRef} onBlur={handleBlur} type='text' maxLength='5' onChange={handleInput}></input>
        </form>
        <div className='board'>
          <TargetContext.Provider value={target}>
            <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={0} />
            <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={1} />
            <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={2} />
            <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={3} />
            <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={4} />
          </TargetContext.Provider>
        </div>
      </div>
    </>
  )
}

export default App
