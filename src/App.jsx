import { useState, useEffect } from 'react'
import './App.css'
import TargetContext from './contexts/TargetContext.jsx';
import Row from './components/Row.jsx';
import Key from './components/Key.jsx';
import InstructionsModal from './components/InstructionsModal.jsx';
import RiddleModal from './components/RiddleModal.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [gameState, setGameState] = useState(0);
  const [target, setTarget] = useState("YELLOWLIGHTS"); // Top secret super secret word YOU ARE NOT SUPPOSED TO KNOW
  const [input, setInput] = useState('');
  const [activeRow, setActiveRow] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [popupText, setPopupText] = useState('Not Enough Letters.');

  // Intro sequence state
  const [showRiddleModal, setShowRiddleModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Share tooltip state
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  // Tap/Click Handlers
  const handleTap = (letter) => {
    if (input.length < 12) {
      setInput(input + letter);
    }
  }

  // Delete selected Letter
  const handleDelete = () => {
    setInput(input.slice(0, -1));
  }

  // Reset Game Function
  const resetGame = () => {
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

  // Submt Word and verification
  const handleSubmit = () => {
    // Check if input is 12 characters
    if (input.length !== 12) {
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

    // Add current attempt
    const newAttempts = [...attempts, input];
    setAttempts(newAttempts);

    // Check for win condition
    if (input === target) {
        setGameState(1);
        return;
    }

    // Check for lose condition (6 attempts made)
    if (activeRow >= 5) {
        setGameState(2);
        return;
    }

    // Continue game
    setActiveRow(activeRow + 1);
    setInput('');
  }

  // Copy to Clipboard Function
  const copyToClipboard = () => {
    const shareText = gameState === 1 
      ? `I beat the CM Zine Riddle on attempt number ${activeRow + 1}! Can you do better? https://cm-zine-riddle.netlify.app/`
      : "I did not guess the answer! Can you do better? https://cm-zine-riddle.netlify.app/";
    
    navigator.clipboard.writeText(shareText)
      .then(() => {
        // Show tooltip
        setShowShareTooltip(true);
        // Hide tooltip after 2 seconds
        setTimeout(() => {
          setShowShareTooltip(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  // Format target word with space between the two 6-letter words
  const formatTargetWord = () => {
    return `${target.slice(0, 6)} ${target.slice(6)}`;
  };

  // Render result page (win or lose)
  const renderResultPage = (isWin) => {
    const pageClass = isWin ? 'win-page' : 'lose-page';
    const titleClass = isWin ? 'win-title' : 'lose-title';
    const title = isWin ? 'You Solved it!' : 'Better luck next time!';
    const label = isWin ? 'The word is' : 'The word was';

    return (
      <div className={`result-page ${pageClass}`}>
        <div className="result-content">
          <h2 className={`result-title ${titleClass}`}>{title}</h2>
          <div className="result-word-container">
            <p className="result-word-label">{label}</p>
            <h1 className="result-word">{formatTargetWord()}</h1>
          </div>
          <div className='btn-container'>
            <div className="share-button-container">
              <button className='btn-green' onClick={copyToClipboard} style={{ color: 'white' }}>
                SHARE <FontAwesomeIcon icon={faShareNodes} />
              </button>
              {showShareTooltip && (
                <div className="share-tooltip">
                  Copied to clipboard!
                </div>
              )}
            </div>
            <button className='btn-black' onClick={resetGame} style={{ color: 'white' }}>
              PLAY AGAIN <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Intro sequence handlers
  const handleRiddleModalClose = () => {
    setShowRiddleModal(false);
    setShowInstructionsModal(true);
  };

  const handleInstructionsModalClose = () => {
    setShowInstructionsModal(false);
    setHasSeenIntro(true);
    // Save to localStorage so intro doesn't show again
    localStorage.setItem('hasSeenIntro', 'true');
  };

  // Check if user has seen intro before
  useEffect(() => {
    const hasSeenIntroBefore = localStorage.getItem('hasSeenIntro');
    if (!hasSeenIntroBefore) {
      setShowRiddleModal(true);
    } else {
      setHasSeenIntro(true);
    }
  }, []);

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
      <InstructionsModal 
        isOpen={!hasSeenIntro ? showInstructionsModal : undefined} 
        onClose={!hasSeenIntro ? handleInstructionsModalClose : undefined} 
      />
      <RiddleModal 
        isOpen={!hasSeenIntro ? showRiddleModal : undefined} 
        onClose={!hasSeenIntro ? handleRiddleModalClose : undefined} 
      />
      <div className='header'>
        <h1 className="title">RIDDLE ME THIS!</h1>
        <h2 className="subtitle">Six Tries. One riddle. Infinite bragging rights</h2>
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
          renderResultPage(true)
        ) : gameState === 2 ? (
          renderResultPage(false)
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
