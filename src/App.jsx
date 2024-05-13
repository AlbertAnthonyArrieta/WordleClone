import { useState, useEffect } from 'react'
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
  const [target, setTarget] = useState("FLAME");
  const [input, setInput] = useState('');
  const [activeRow, setActiveRow] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [popupText, setPopupText] = useState('Not Enough Letters.');
  const [results, setResults] = useState([]);


  // Tap/Click Handlers
  const handleTap = (letter) => {
    if (input.length < 5) {
      setInput(input + letter);
    }
    
  }

  // Delete selected Letter
  const handleDelete = () => {
    setInput(input.slice(0, -1));
  }

  // Reset Game Function
  const resetGame = () => {
    console.log("Game Reset...");
    setActiveRow(0);
    setAttempts([]);
    setInput('');
    setGameState(0);
  }

  const activatePopup = () => {
    document.querySelector('.popup').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.popup').style.display = 'none';
      setPopupText('');
    }, 2000);
  }

  const collectResults = () => {
    for (let i = 0; i < attempts.length; i++) {
      let currentAttempt = attempts[i];
      let currentRow = '';
      for (let j = 0; j < currentAttempt.length+1; j++) {
        if (currentAttempt[j] === target[j]) {
          currentRow = currentRow + 'G';
        } else if (target.includes(currentAttempt[j])) {
          currentRow = currentRow + 'Y';
        } else {
          currentRow = currentRow + 'B';
        }
      }
      setResults([...results, currentRow]);
    }
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
    console.log(results[3]);
    console.log(results[4]);
    console.log(results[5]);
  }

  // Submt Word and verification
  const handleSubmit = () => {

    // Check if input is 5 characters
    if (input.length !== 5) {
      setPopupText('Not Enough Letters.');
      activatePopup();
      return;
    }

    // Check if input already exists in attempts
    for (let i = 0; i < attempts.length; i++) {
      if (input === attempts[i]) {
        setPopupText('You already tried that word!');
        activatePopup();
        return;
      }
    }

    // Save answer to arrempts and switch active row
    setAttempts([...attempts, input]);
    setActiveRow(activeRow + 1);

    // Win/Lose determination
    if (input === target) {
      collectResults();
      setGameState(1);

    } else if (activeRow > 4) {
      setGameState(2);
      collectResults();
    } else {
      setGameState(0);
    }
    // Reset input
    setInput('');
  }

  // Copy to Clipboard Function
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

    // Handle keyboard inputs
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
                <Row activeRow={activeRow} word={input} target={target} attempts={attempts} rowNum={5} />
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
