import React, { useState } from 'react';
import Game from './components/Game';
import Policies from './components/Policies';
import Landing from './components/Landing';
import './App.css';

type View = 'landing' | 'game' | 'policies';

function App() {
  const [activeView, setActiveView] = useState<View>('landing');

  const renderView = () => {
    switch (activeView) {
      case 'game':
        return <Game />;
      case 'policies':
        return <Policies />;
      default:
        return <Landing onSelectView={setActiveView} />;
    }
  };

  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#" onClick={() => setActiveView('landing')}>
            FD Games
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeView === 'landing' ? 'active' : ''}`}
                  href="#"
                  onClick={() => setActiveView('landing')}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeView === 'game' ? 'active' : ''}`} href="#" onClick={() => setActiveView('game')}>
                  Furniture Game
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeView === 'policies' ? 'active' : ''}`}
                  href="#"
                  onClick={() => setActiveView('policies')}
                >
                  Policies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="main-content">{renderView()}</main>
    </div>
  );
}

export default App;
