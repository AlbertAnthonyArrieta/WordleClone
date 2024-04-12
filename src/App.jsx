import { useState, useRef, useEffect, useContext } from 'react'
import './App.css'
import TargetContext from './contexts/TargetContext.jsx';
import Row from './components/Row.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

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

  const resetGame = () => {
    console.log("Game Reset...");
    setActiveRow(0);
    setAttempts([]);
    setInput('');
    setGameState(0);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttempts([...attempts, event.target.answer.value.toUpperCase()]);
    setActiveRow(activeRow + 1);
    console.log(activeRow);

    // Win/Lose determination
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
              <div className='btn-container'>
                <button className='btn-green' onClick={resetGame}>SHARE <FontAwesomeIcon icon={faShareNodes} /></button>
                <button className='btn-black' onClick={resetGame}>PLAY AGAIN <FontAwesomeIcon icon={faRotateRight} /></button>
              </div>
            </div>
          ) : gameState === 2 ? (
            <div>
              <h2>YOU LOSE!</h2>
              <h1>The word is <span>{target}</span></h1>
              <button className='btn-black' onClick={resetGame}>PLAY AGAIN </button>
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
