export const Tile = ({ color, letter }) => {
    return (
        <>
            <div className={
                color === "correct" ? (
                    "tile tile-correct"
                ) : color === "close" ? (
                    "tile tile-close"
                ) : color === "wrong" ? (
                    "tile tile-wrong"
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