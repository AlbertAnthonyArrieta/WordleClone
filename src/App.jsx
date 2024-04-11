import { useState, useRef, useEffect, useContext } from 'react'
import './App.css'
import TargetContext from './contexts/TargetContext.jsx';
import Row from './components/Row.jsx';

function App() {

  const [gameState, setGameState] = useState(0);

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
    console.log(activeRow);

    if (event.target.answer.value.toUpperCase() === target) {
      setGameState(1);
    } else if (activeRow > 3) {
      setGameState(2);
    } else {
      setGameState(0);
    }

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
          {gameState === 0 ? (
            <TargetContext.Provider value={target}>
              <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={0} />
              <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={1} />
              <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={2} />
              <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={3} />
              <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={4} />
            </TargetContext.Provider>
          ) : gameState === 1 ? (
            <div>
              <h2>You WIN!</h2>
              <h1>The word is <span>{target}</span></h1>
            </div>
          ) : gameState === 2 ? (
            <div>
              <h2>YOU LOSE!</h2>
              <h1>The word is <span>{target}</span></h1>
            </div>
          ) : (
            <div>
              <h1>ERROR: Invalid Game State</h1>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
