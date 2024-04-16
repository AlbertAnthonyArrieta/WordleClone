import { useContext } from "react"
import TargetContext from "../contexts/TargetContext";

export const Tile = ({ active, letter, pos }) => {

    const target = useContext(TargetContext);

    

    return (
        <>
            <div className={
                !active ? (
                    letter === target.charAt(pos) ? (
                        "tile tile-correct"
                    ) : target.includes(letter) && letter !== '' ? (
                        "tile tile-close"
                    ) : letter === '' ? (
                        "tile tile-default"
                    ) : (
                        "tile tile-wrong"
                    )
                ) : (
                    "tile tile-default"
                )
               
            }>
                {letter}
            </div>
        </>
    )
}

export default Tile