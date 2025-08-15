import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece, faTimes } from '@fortawesome/free-solid-svg-icons';

const RiddleModal = ({ isOpen: externalIsOpen, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Use external state if provided, otherwise use internal state
    const modalIsOpen = externalIsOpen !== undefined ? externalIsOpen : isOpen;

    const openModal = () => {
        if (externalIsOpen === undefined) {
            setIsOpen(true);
        }
    };
    
    const closeModal = () => {
        if (externalIsOpen !== undefined) {
            // If controlled externally, call the external close handler
            if (onClose) onClose();
        } else {
            // If using internal state, close normally
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Riddle Button */}
            <button className="riddle-button" onClick={openModal} title="View Riddle">
                <FontAwesomeIcon icon={faPuzzlePiece} />
            </button>

            {/* Modal Overlay */}
            {modalIsOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content riddle-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Solve this riddle!</h2>
                            <button className="close-button" onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="riddle-section">
                                <div className="riddle-text">
                                    <blockquote className="riddle-quote">
                                        <p><em>"In the space between safety and sin, I perform my ritual dance,</em></p>
                                        <p><em>A nervous percussion on metal above, as seconds slip past in a trance.</em></p>
                                        <p><em>Neither red's full stop nor green's eager go can command what I do,</em></p>
                                        <p><em>But when amber eyes blink their warning, my knuckles know what they must puursue.</em></p>
                                        <p><em>I race against time's cruel countdown, my fingers drumming overhead,</em></p>
                                        <p><em>A superstitious beat that echoes the fear of futures I dread,</em></p>
                                        <p><em>Some say I'm chasing luck's favor, others think I've lost my mind,</em></p>
                                        <p><em>But in those moments of suspension, it's salvation that I'm trying to find,</em></p>
                                        <p><em>What golden guardians of the crossroads make my hand reach for the sky,</em></p>
                                        <p><em>Compelling this strange benediction as their brief moment passes by?"</em></p>
                                    </blockquote>
                                </div>
                                
                                <div className="riddle-hint">
                                    <h4>Hint:</h4>
                                    <p>Somewhere on the magazine page you scanned might be a little visual nod to the answer - spot it and you might just solve it faster.</p>
                                    <p>The answer is <strong>two words</strong>, each <strong>6 letters long</strong>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RiddleModal;
