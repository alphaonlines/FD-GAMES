import React, { useState } from 'react';
import Game from './components/Game';
import Policies from './components/Policies';
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('game'); // 'game' or 'policies'

  const renderView = () => {
    switch (activeView) {
      case 'game':
        return <Game />;
      case 'policies':
        return <Policies />;
      default:
        return <Game />;
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={() => setActiveView('game')}>Furniture Game</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className={`nav-link ${activeView === 'game' ? 'active' : ''}`} aria-current="page" href="#" onClick={() => setActiveView('game')}>Game</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeView === 'policies' ? 'active' : ''}`} href="#" onClick={() => setActiveView('policies')}>Policies</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {renderView()}
    </>
  )
}

export default App
