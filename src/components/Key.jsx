import { useContext } from "react"
import TargetContext from "../contexts/TargetContext";
export const Key = ({ long, letter, attempts }) => {

    const target = useContext(TargetContext);

    const guessed = () => {
        attempts.forEach((a) => {
            if (a.includes(letter)) {
                // working on verifying letter position for keys
            }
        })
    }

    const checkLetter = () => {
        if (target && target.includes(letter) && guessed === 2) {
            return 1;
        } else {
            return 0;
        }
    }

    return (
        <>
            <div className={
                long === 'true' ? (
                    "key long-key key-default"
                    ) : (
                        checkLetter() === 1 ? (
                            "key key-close"
                        ) : checkLetter() === 2 ? (
                            "key key-correct"
                        ) : checkLetter() === 3 ?(
                            "key key-wrong"
                        ) : (
                            "key key-default"
                        )
                        )}>
                {letter}
            </div>
        </>
    )
}

Key.defaultProps = {
    long: 'false'
}

export default Key;