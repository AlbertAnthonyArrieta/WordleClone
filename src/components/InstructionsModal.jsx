import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faTimes } from "@fortawesome/free-solid-svg-icons";

const InstructionsModal = ({ isOpen: externalIsOpen, onClose }) => {
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
      {/* Question Mark Button */}
      <button className="help-button" onClick={openModal} title="How to Play">
        <FontAwesomeIcon icon={faQuestion} />
      </button>

      {/* Modal Overlay */}
      {modalIsOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>How to Play</h2>
              <button className="close-button" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="modal-body">
              <p>
                <strong>Guess the CM ZINE RIDDLE in 6 tries!</strong>
              </p>

              <div className="instruction-section">
                <h3>How to play:</h3>
                <ul>
                  <li>
                    Read the riddle, (click the light bulb button!) that's your puzzle.
                  </li>
                  <li>
                    Type your guess for the riddle's answer into the grid.
                  </li>
                </ul>
              </div>

              <div className="instruction-section">
                <h3>Check the colors:</h3>
                <div className="example-row">
                  <div className="example-tiles">
                    <div className="example-tile correct">U</div>
                    <div className="example-tile correct">N</div>
                    <div className="example-tile close">D</div>
                    <div className="example-tile close">E</div>
                    <div className="example-tile close">R</div>
                    <div className="example-tile wrong">T</div>
                    <div className="example-tile close">A</div>
                    <div className="example-tile wrong">K</div>
                    <div className="example-tile close">E</div>
                  </div>
                  <p>
                    The answer for this example is{" "}
                    <span style={{ fontWeight: "bold" }}>"UNRAVELED"</span>
                  </p>
                  <div className="color-legend">
                    <p>
                      <span className="legend-green">■</span> Green means the
                      letter is in the answer and in the right spot.
                    </p>
                    <p>
                      <span className="legend-yellow">■</span> Yellow means the
                      letter is in the answer but in the wrong spot.
                    </p>
                    <p>
                      <span className="legend-grey">■</span> Gray means the
                      letter isn't in the answer at all.
                    </p>
                    <p>
                      Use the clues from each guess to narrow it down. You have
                      six guesses to crack it.
                    </p>
                  </div>
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
