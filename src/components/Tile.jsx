import { useContext, useState, useEffect } from "react"
import TargetContext from "../contexts/TargetContext";
// Assets now served from public folder - no imports needed, use direct paths
const tile1Default = '/assets/Tile1.svg';
const tile1Correct = '/assets/Tile1-correct.svg';
const tile1Close = '/assets/Tile1close.svg';
const tile1Wrong = '/assets/Tile1-wrong.svg';
const tile2Default = '/assets/Tile2.svg';
const tile2Correct = '/assets/Tile2-correct.svg';
const tile2Close = '/assets/Tile2-close.svg';
const tile2Wrong = '/assets/Tile2-wrong.svg';
const tile3Default = '/assets/Tile3.svg';
const tile3Correct = '/assets/Tile3-correct.svg';
const tile3Close = '/assets/Tile3-close.svg';
const tile3Wrong = '/assets/Tile3-wrong.svg';

// Assets served from public folder - all assets will be available at runtime
const tileAssets = {
    tile1: {
        default: tile1Default,
        correct: tile1Correct, 
        close: tile1Close,
        wrong: tile1Wrong,
    },
    tile2: {
        default: tile2Default,
        correct: tile2Correct,
        close: tile2Close, 
        wrong: tile2Wrong,
    },
    tile3: {
        default: tile3Default,
        correct: tile3Correct,
        close: tile3Close,
        wrong: tile3Wrong,
    }
};

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
                return status === 'correct' ? tileAssets.tile1.correct :
                       status === 'close' ? tileAssets.tile1.close :
                       status === 'wrong' ? tileAssets.tile1.wrong :
                       tileAssets.tile1.default;
            case 2:
                return status === 'correct' ? tileAssets.tile2.correct :
                       status === 'close' ? tileAssets.tile2.close :
                       status === 'wrong' ? tileAssets.tile2.wrong :
                       tileAssets.tile2.default;
            case 3:
                return status === 'correct' ? tileAssets.tile3.correct :
                       status === 'close' ? tileAssets.tile3.close :
                       status === 'wrong' ? tileAssets.tile3.wrong :
                       tileAssets.tile3.default;
            default:
                return tileAssets.tile1.default;
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
