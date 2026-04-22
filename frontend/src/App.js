import React, { useState } from 'react';
import './App.css';
import HistorianChat from './components/HistorianChat';
import CharacterChat from './components/CharacterChat';
import FruitCreator from './components/FruitCreator';

function App() {
  const [activeSection, setActiveSection] = useState('historian');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="logo">
          <img src="/straw-hat.png" alt="Straw Hat" className="logo-icon" />
          <span className="logo-red">OnePiece</span>AI
        </h1>
        <nav className="header-nav">
          <button
            className={`nav-btn ${activeSection === 'historian' ? 'active' : ''}`}
            onClick={() => setActiveSection('historian')}
          >
            Historiador AI
          </button>
          <button
            className={`nav-btn ${activeSection === 'character' ? 'active' : ''}`}
            onClick={() => setActiveSection('character')}
          >
            Personagens AI
          </button>
          <button
            className={`nav-btn ${activeSection === 'fruit' ? 'active' : ''}`}
            onClick={() => setActiveSection('fruit')}
          >
            Criador de Frutas AI
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeSection === 'historian' && <HistorianChat />}
        {activeSection === 'character' && <CharacterChat />}
        {activeSection === 'fruit' && <FruitCreator />}
      </main>
    </div>
  );
}

export default App;
