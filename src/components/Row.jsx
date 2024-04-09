import Tile from "./Tile.jsx";
export const Row = () => {
    return (
        <>
            <div className='row'>
                <Tile letter='C' color="correct" />
                <Tile letter='R' />
                <Tile letter='E' />
                <Tile letter='A' />
                <Tile letter='M' />
            </div>
        </>
    )
}

export default Row;