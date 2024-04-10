import { useContext } from "react"
import TargetContext from "../contexts/TargetContext";

export const Tile = ({ letter, pos}) => {

    const target = useContext(TargetContext);

    return (
        <>
            <div className={
                letter === target.charAt(pos) ? (
                    "tile tile-correct"
                ) : target.includes(letter) && letter !== '' ? (
                    "tile tile-close"
                ) : letter === '' ? (
                    "tile tile-default"
                ) : (
                    "tile tile-wrong"
                )
            }>
                {letter}
            </div>
        </>
    )
}

export default Tile