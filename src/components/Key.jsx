import { useContext, useState, useEffect } from "react"
import TargetContext from "../contexts/TargetContext";
export const Key = ({ onClick, long, letter, attempts, activeRow }) => {
    const target = useContext(TargetContext);

    // Helper function to get state value (3 for correct, 2 for close, 1 for wrong)
    const getStateValue = (state) => {
        if (state === 'key-correct') return 3;
        if (state === 'key-close') return 2;
        if (state === 'key-wrong') return 1;
        return 0;
    }

    // Get the highest state achieved for this key
    const getKeyState = () => {
        let highestState = 0;

        for (let i = 0; i < attempts.length; i++) {
            if (attempts[i].includes(letter)) {
                let currentState = 0;
                if (attempts[i][attempts[i].indexOf(letter)] === target[attempts[i].indexOf(letter)]) {
                    currentState = 3; // correct
                } else if (target.includes(letter)) {
                    currentState = 2; // close
                } else {
                    currentState = 1; // wrong
                }

                // Update highest state according to rules
                if (currentState === 3 || highestState === 3) {
                    highestState = 3; // correct state is permanent
                } else if (currentState === 1) {
                    highestState = 1; // wrong state is permanent
                } else if (currentState === 2 && highestState !== 1) {
                    highestState = 2; // close state only if not wrong
                }
            }
        }
        return highestState;
    }

    // Convert state value back to className
    const getClassName = () => {
        const stateValue = getKeyState();
        if (stateValue === 3) return "key key-correct";
        if (stateValue === 2) return "key key-close";
        if (stateValue === 1) return "key key-wrong";
        return "key key-default";
    }

    return (
        <div
            className={getClassName()}
            onClick={() => onClick(letter)}
        >
            {letter}
        </div>
    );
}

Key.defaultProps = {
    long: 'false'
}

export default Key;