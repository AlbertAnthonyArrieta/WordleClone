import { useContext, useState, useEffect } from "react"
import TargetContext from "../contexts/TargetContext";
export const Key = ({ long, letter, attempts, activeRow }) => {

    const target = useContext(TargetContext);
    const [letterState, setLetterState] = useState(0);

    useEffect(() => {
        if (Array.isArray(attempts) && attempts.length > 0) {
            const lastAttempt = attempts[attempts.length - 1];
            if (lastAttempt.includes(letter) && target.includes(letter)) {
                if (lastAttempt.indexOf(letter) === target.indexOf(letter)) {
                    setLetterState(3);
                } else {
                    setLetterState(2);
                }
            } else {
                setLetterState(1);
            }
        }
    }, [attempts, letter]);

    return (
        <>
            <div className={
                long === 'true' ? (
                    "key long-key key-default"
                ) : (
                    letterState === 3 ? (
                        "key key-correct"
                    ) : letterState === 2 ? (
                        "key key-close"
                    ) : letterState === 1 ? (
                        "key key-wrong"
                    ) : (
                        "key key-default"
                    )
                )
            }>
                {letter}
            </div >
        </>
    )
}

Key.defaultProps = {
    long: 'false'
}

export default Key;