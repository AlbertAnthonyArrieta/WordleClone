import { useContext } from "react"
import TargetContext from "../contexts/TargetContext";

export const Key = ({ onClick, long, letter, attempts, activeRow }) => {
    const target = useContext(TargetContext);

    // Convert state value back to className - keeping keys one color
    const getClassName = () => {
        // Always return default color instead of calculating state
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