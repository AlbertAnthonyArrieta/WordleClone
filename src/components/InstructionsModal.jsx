import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faTimes } from '@fortawesome/free-solid-svg-icons';

const InstructionsModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {/* Question Mark Button */}
            <button className="help-button" onClick={openModal} title="How to Play">
                <FontAwesomeIcon icon={faQuestion} />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>How to Play</h2>
                            <button className="close-button" onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <p><strong>Guess the CM ZINE RIDDLE in 6 tries!</strong></p>
                            
                            <div className="instruction-section">
                                <h3>How to play:</h3>
                                <ul>
                                    <li>Solve the riddle! The riddle is 2 words, each 6 letters long.</li>
                                    <li>Each guess must fill in all 12 paper squares!</li>
                                    <li>Hit the enter button to submit your guess!</li>
                                    <li>After each guess, the color of the tiles will change to show how close your guess was to the word</li>
                                </ul>
                            </div>

                            <div className="instruction-section">
                                <h3>Examples:</h3>
                                <div className="example-row">
                                    <div className="example-tiles">
                                        <div className="example-tile correct">H</div>
                                        <div className="example-tile">O</div>
                                        <div className="example-tile">N</div>
                                        <div className="example-tile">E</div>
                                        <div className="example-tile">S</div>
                                        <div className="example-tile">T</div>
                                    </div>
                                    <span className="example-text">The letter <strong>H</strong> is in the word and in the CORRECT spot.</span>
                                </div>

                                <div className="example-row">
                                    <div className="example-tiles">
                                        <div className="example-tile">P</div>
                                        <div className="example-tile close">I</div>
                                        <div className="example-tile">L</div>
                                        <div className="example-tile">O</div>
                                        <div className="example-tile">T</div>
                                        <div className="example-tile">S</div>
                                    </div>
                                    <span className="example-text">The letter <strong>I</strong> is in the word but in the WRONG spot.</span>
                                </div>

                                <div className="example-row">
                                    <div className="example-tiles">
                                        <div className="example-tile">V</div>
                                        <div className="example-tile">A</div>
                                        <div className="example-tile">G</div>
                                        <div className="example-tile wrong">U</div>
                                        <div className="example-tile">E</div>
                                        <div className="example-tile">S</div>
                                    </div>
                                    <span className="example-text">The letter <strong>U</strong> is not in the word in any spot.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InstructionsModal;
