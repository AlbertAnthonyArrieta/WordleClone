import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faTimes } from '@fortawesome/free-solid-svg-icons';

const RiddleModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {/* Riddle Button */}
            <button className="riddle-button" onClick={openModal} title="View Riddle">
                <FontAwesomeIcon icon={faLightbulb} />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>The Riddle</h2>
                            <button className="close-button" onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="riddle-section">
                                <div className="riddle-text">
                                    <h3> Solve this riddle!:</h3>
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
                                    <h4>💡 Hint:</h4>
                                    <p>The answer is <strong>two words</strong>, each <strong>6 letters long</strong>.</p>
                                </div>

                                <div className="riddle-footer">
                                    <p><small>🎯 Fill in all 12 letters to solve the riddle!</small></p>
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
