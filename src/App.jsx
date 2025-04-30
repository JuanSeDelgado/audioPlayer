import './App.css'
import SongsCarousel from './Components/SongsCarousel';
import EasySongPlayer from './Components/easySongPlayer';
import { useState } from 'react';

function App() {
  const [showPlayer, setShowPlayer] = useState(true);

  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center min-vh-100'>
        <h1 className="h1 text-light">Click to Change Player</h1>
        <div className="d-flex flex-column align-items-center mb-3" style={{marginTop: '10px'}}>
          <div className="form-check form-switch d-flex align-items-center justify-content-center">
            <input
              className="form-check-input"
              type="checkbox"
              id="toggleView"
              checked={!showPlayer}
              onChange={() => setShowPlayer((prev) => !prev)}
              style={{ cursor: 'pointer', width: '3em', height: '1.5em' }}
            />
          </div>
        </div>
        {showPlayer ? <EasySongPlayer /> : <SongsCarousel />}
      </div>
      
    </>
  )
}

export default App
