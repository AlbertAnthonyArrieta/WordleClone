import Tile from "./Tile.jsx";
export const Row = ({ word, target }) => {
    let t0 = target ? target.charAt(0) : '';
    let l0 = word.toUpperCase().charAt(0);
    let l1 = word.toUpperCase().charAt(1);
    let l2 = word.toUpperCase().charAt(2);
    let l3 = word.toUpperCase().charAt(3);
    let l4 = word.toUpperCase().charAt(4);
    return (
        <>
            <div className='row'>
                <Tile letter={l0} pos="0" />
                <Tile letter={l1} pos="1"/>
                <Tile letter={l2} pos="2"/>
                <Tile letter={l3} pos="3"/>
                <Tile letter={l4} pos="4"/>
            </div>
        </>
    )
}

Row.defaultProps = {
    word: ''
}

export default Row;