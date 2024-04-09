import { useState } from 'react'
import './App.css'
import Tile from './components/Tile.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='header'>
        <h1>WORDLE</h1>
      </div>
      <div className='game'>
        <div className='board'>
          <div className='row'>
            <Tile letter='C' />
            <Tile letter='R' />
            <Tile letter='E' />
            <Tile letter='A' />
            <Tile letter='M' />
          </div>
          <div className='row'>
            <Tile letter='C' />
            <Tile letter='R' />
            <Tile letter='E' />
            <Tile letter='A' />
            <Tile letter='M' />
          </div>
          <div className='row'>
            <Tile letter='C' />
            <Tile letter='R' />
            <Tile letter='E' />
            <Tile letter='A' />
            <Tile letter='M' />
          </div>
          <div className='row'>
            <Tile letter='C' />
            <Tile letter='R' />
            <Tile letter='E' />
            <Tile letter='A' />
            <Tile letter='M' />
          </div>
          <div className='row'>
            <Tile letter='C' />
            <Tile letter='R' />
            <Tile letter='E' />
            <Tile letter='A' />
            <Tile letter='M' />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
