import { useContext, useState, useEffect } from "react"
import TargetContext from "../contexts/TargetContext";
import tile1 from '../assets/images/tile1.png';
import tile2 from '../assets/images/tile2.png';
import tile3 from '../assets/images/tile3.png';
import oImage from '../assets/images/O.png';
import qImage from '../assets/images/Q.png';
import xImage from '../assets/images/X.png';

export const Tile = ({ active, letter, pos, attempt }) => {
    const target = useContext(TargetContext);
    const position = parseInt(pos);
    const [selectedTile, setSelectedTile] = useState(null);    // Set random tile background on mount
    useEffect(() => {
        const tiles = [tile1, tile2, tile3];
        const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
        setSelectedTile(randomTile);
    }, []);    const getTileStatus = () => {
        if (active || letter === '') return null;
        if (letter === target.charAt(position)) return 'correct';

        if (letter !== '' && target.includes(letter)) {
            const targetCount = [...target].filter(l => l === letter).length;
            const exactMatches = [...attempt]
                .filter((l, i) => l === letter && l === target[i]).length;
            const previousYellows = [...attempt].slice(0, position)
                .filter((l, i) => l === letter && l !== target[i]).length;
            
            if (exactMatches + previousYellows < targetCount) {
                return 'close';
            }
        }
        
        return 'wrong';
    };

    const tileStyle = selectedTile ? {
        backgroundImage: `url(${selectedTile})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};

    const status = getTileStatus();
    const statusImage = status === 'correct' ? oImage :
                       status === 'close' ? qImage :
                       status === 'wrong' ? xImage :
                       null;

    return (
        <div className="tile" style={tileStyle}>
            {letter}
            {statusImage && 
                <div className="tile-status">
                    <img src={statusImage} alt={status} className="status-overlay" />
                </div>
            }
        </div>
    )
}

export default Tile