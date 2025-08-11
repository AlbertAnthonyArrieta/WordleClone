import { useContext, useState, useEffect } from "react"
import TargetContext from "../contexts/TargetContext";
// Import from src so Vite bundles and rewrites URLs with the correct base
import tile1Default from '../assets/images/Tile1close.svg';
import tile1Correct from '../assets/images/Tile1-correct.svg';
import tile1Close from '../assets/images/Tile1close.svg';
import tile1Wrong from '../assets/images/Tile1-wrong.svg';
import tile2Default from '../assets/images/Tile2.svg';
import tile2Correct from '../assets/images/Tile2-correct.svg';
import tile2Close from '../assets/images/Tile2-close.svg';
import tile2Wrong from '../assets/images/Tile2-wrong.svg';
import tile3Default from '../assets/images/Tile3.svg';
import tile3Correct from '../assets/images/Tile3-correct.svg';
import tile3Close from '../assets/images/Tile3-close.svg';
import tile3Wrong from '../assets/images/Tile3-wrong.svg';

export const Tile = ({ active, letter, pos, attempt }) => {
    const target = useContext(TargetContext);
    const position = parseInt(pos);
    const [selectedTile, setSelectedTile] = useState(null);
    
    useEffect(() => {
        const tileType = Math.floor(Math.random() * 3) + 1;
        setSelectedTile(tileType);
    }, []);

    const getTileStatus = () => {
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
    };    const getTileImage = () => {
        if (!selectedTile) return null;
        const status = getTileStatus();
        
        switch(selectedTile) {
            case 1:
                return status === 'correct' ? tile1Correct :
                       status === 'close' ? tile1Close :
                       status === 'wrong' ? tile1Wrong :
                       tile1Default;
            case 2:
                return status === 'correct' ? tile2Correct :
                       status === 'close' ? tile2Close :
                       status === 'wrong' ? tile2Wrong :
                       tile2Default;
            case 3:
                return status === 'correct' ? tile3Correct :
                       status === 'close' ? tile3Close :
                       status === 'wrong' ? tile3Wrong :
                       tile3Default;
            default:
                return tile1Default;
        }
    };
    // Compute status once per render
    const status = getTileStatus();
    const tileStyle = {
        backgroundImage: getTileImage() ? `url(${getTileImage()})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: active ? '#343434' : 'white'
    };

    return (
        <div className={`tile ${status || ''}`} style={tileStyle}>
            {letter}
        </div>
    );
};

export default Tile;
