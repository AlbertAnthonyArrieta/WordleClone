import Tile from "./Tile.jsx";
export const Row = ({ activeRow, word, attempts, rowNum }) => {
    let l0 = word.toUpperCase().charAt(0);
    let l1 = word.toUpperCase().charAt(1);
    let l2 = word.toUpperCase().charAt(2);
    let l3 = word.toUpperCase().charAt(3);
    let l4 = word.toUpperCase().charAt(4);

    let active = false;

    activeRow === rowNum ? (active = true) : (active = false);
    return (
        <>
            {active ? (
                <div className='row'>
                    <Tile active={active} letter={l0} pos="0" />
                    <Tile active={active} letter={l1} pos="1" />
                    <Tile active={active} letter={l2} pos="2" />
                    <Tile active={active} letter={l3} pos="3" />
                    <Tile active={active} letter={l4} pos="4" />
                </div>
            ) : (
                <div className='row'>
                    <Tile letter={attempts[rowNum] ? (attempts[rowNum].charAt(0)) : ("")} pos="0" />
                    <Tile letter={attempts[rowNum] ? (attempts[rowNum].charAt(1)) : ("")} pos="1" />
                    <Tile letter={attempts[rowNum] ? (attempts[rowNum].charAt(2)) : ("")} pos="2" />
                    <Tile letter={attempts[rowNum] ? (attempts[rowNum].charAt(3)) : ("")} pos="3" />
                    <Tile letter={attempts[rowNum] ? (attempts[rowNum].charAt(4)) : ("")} pos="4" />
                </div>
            )}

        </>
    )
}

Row.defaultProps = {
    word: ''
}

export default Row;