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
  const [input, setInput] = useState('');
  const [activeRow, setActiveRow] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [popupText, setPopupText] = useState('Not Enough Letters.');


  const handleTap = (letter) => {
    console.log(input + letter);
    setInput(input + letter);
  }

  const handleDelete = () => {
    setInput(input.slice(0, -1));
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

  const handleSubmit = () => {
    setAttempts([...attempts, input]);
    setActiveRow(activeRow + 1);
    console.log(activeRow);

    // Win/Lose determination
    if (input === target) {
      setGameState(1);

    } else if (activeRow > 3) {
      setGameState(2);
    } else {
      setGameState(0);
    }

    setInput('');
    console.log(attempts);
  }

  const copyToClipboard = () => {
    if (gameState === 1) {
      navigator.clipboard.writeText("Wordle: I guessed the word on attempt number " + activeRow + "! Can you do better? https://wurdle-4b514c.netlify.app/")
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    } else {
      navigator.clipboard.writeText("I'm am so ashamed that I did not guess the word! Can you do better? https://wurdle-4b514c.netlify.app/")
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    }

  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (/^[a-zA-Z]$/.test(event.key)) {
        handleTap(event.key.toUpperCase());
      } else if (event.key === 'Enter') {
        handleSubmit();
      } else if (event.key === 'Backspace') {
        handleDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleTap]);


  return (
    <>
      <div className='header'>
        <h1 className="title">WORDLE</h1>
        <div className='popup'>{popupText}</div>
      </div>
      <div className='game'>

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
                  <Key onClick={handleTap} letter='Q' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='W' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='E' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='R' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='T' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='Y' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='U' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='I' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='O' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='P' attempts={attempts} activeRow={activeRow} />
                </div>
                <div className='keyboard-row'>
                  <Key onClick={handleTap} letter='A' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='S' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='D' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='F' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='G' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='H' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='J' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='K' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='L' attempts={attempts} activeRow={activeRow} />
                </div>
                <div className='keyboard-row'>
                  <div onClick={handleSubmit} className='key long-key key-default'>ENTER</div>
                  <Key onClick={handleTap} letter='Z' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='X' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='C' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='V' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='B' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='N' attempts={attempts} activeRow={activeRow} />
                  <Key onClick={handleTap} letter='M' attempts={attempts} activeRow={activeRow} />
                  <div onClick={handleDelete} className='key long-key key-default'><FontAwesomeIcon icon={faDeleteLeft} /></div>

                </div>

              </div>
            </TargetContext.Provider>
          </div>

        ) : gameState === 1 ? (
          <div>
            <h2>You WIN!</h2>
            <h1>The word is <span>{target}</span></h1>
            <div className='btn-container'>
              <button className='btn-green' onClick={copyToClipboard} style={{ color: 'white' }}>SHARE <FontAwesomeIcon icon={faShareNodes} /></button>
              <button className='btn-black' onClick={resetGame} style={{ color: 'white' }}>PLAY AGAIN <FontAwesomeIcon icon={faRotateRight} /></button>
            </div>
          </div>
        ) : gameState === 2 ? (
          <div>
            <h2>You LOST! The word is</h2>
            <h1>{target}</h1>
            <div className='btn-container'>
              <button className='btn-green' onClick={copyToClipboard} style={{ color: 'white' }}>SHARE <FontAwesomeIcon icon={faShareNodes} /></button>
              <button className='btn-black' onClick={resetGame} style={{ color: 'white' }}>PLAY AGAIN </button>
            </div>
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
