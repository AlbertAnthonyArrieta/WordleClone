import Tile from "./Tile.jsx";
export const Row = ({ word }) => {
    return (
        <>
            <div className='row'>
                <Tile letter={word.toUpperCase().charAt(0)} />
                <Tile letter={word.toUpperCase().charAt(1)} />
                <Tile letter={word.toUpperCase().charAt(2)} />
                <Tile letter={word.toUpperCase().charAt(3)} />
                <Tile letter={word.toUpperCase().charAt(4)} />
            </div>
        </>
    )
}

Row.defaultProps = {
    word: ''
}

export default Row;