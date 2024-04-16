import { useState, useRef, useEffect, useContext } from 'react'
import './App.css'
import TargetContext from './contexts/TargetContext.jsx';
import Row from './components/Row.jsx';
import Key from './components/Key.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

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

        {gameState === 0 ? (
          <div>
            <TargetContext.Provider value={target}>
              <div className='board'>
                <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={0} />
                <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={1} />
                <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={2} />
                <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={3} />
                <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={4} />
              </div>

              <div className='keyboard'>
                <div className='keyboard-row'>
                  <Key letter='Q' attempts={attempts} />
                  <Key letter='W' attempts={attempts} />
                  <Key letter='E' attempts={attempts} />
                  <Key letter='R' attempts={attempts} />
                  <Key letter='T' attempts={attempts} />
                  <Key letter='Y' attempts={attempts} />
                  <Key letter='U' attempts={attempts} />
                  <Key letter='I' attempts={attempts} />
                  <Key letter='O' attempts={attempts} />
                  <Key letter='P' attempts={attempts} />
                </div>
                <div className='keyboard-row'>
                  <Key letter='A' attempts={attempts} />
                  <Key letter='S' attempts={attempts} />
                  <Key letter='D' attempts={attempts} />
                  <Key letter='F' attempts={attempts} />
                  <Key letter='G' attempts={attempts} />
                  <Key letter='H' attempts={attempts} />
                  <Key letter='J' attempts={attempts} />
                  <Key letter='K' attempts={attempts} />
                  <Key letter='L' attempts={attempts} />
                </div>
                <div className='keyboard-row'>
                  {/* <Key long='true' letter='ENTER' /> */}
                  <Key letter='Z' attempts={attempts} />
                  <Key letter='X' attempts={attempts} />
                  <Key letter='C' attempts={attempts} />
                  <Key letter='V' attempts={attempts} />
                  <Key letter='B' attempts={attempts} />
                  <Key letter='N' attempts={attempts} />
                  <Key letter='M' attempts={attempts} />
                  {/* <Key long='true' letter={<FontAwesomeIcon icon={faDeleteLeft} />} /> */}
                </div>

              </div>
            </TargetContext.Provider>
          </div>

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
    </>
  )
}

export default App
