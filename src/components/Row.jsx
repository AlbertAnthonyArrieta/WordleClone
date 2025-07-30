import Tile from "./Tile.jsx";
export const Row = ({ activeRow, word, attempts, rowNum }) => {
    // Create array of 12 letters
    const letters = Array(12).fill('').map((_, i) => word.toUpperCase().charAt(i));
    
    let active = activeRow === rowNum;

    return (
        <>
            {active ? (
                <div className='row'>
                    {letters.map((letter, index) => (
                        <Tile key={index} active={active} letter={letter} pos={index.toString()} />
                    ))}
                </div>
            ) : (
                <div className='row'>
                    {Array(12).fill('').map((_, index) => (
                        <Tile 
                            key={index}
                            letter={attempts[rowNum] ? attempts[rowNum].charAt(index) : ''} 
                            pos={index.toString()} 
                        />
                    ))}
                </div>
            )}
        </>
    )
}

Row.defaultProps = {
    word: ''
}

export default Row;