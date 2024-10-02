import React, { useState } from 'react';
import './App.css';
import Metaballs from './components/aia/metaballs/Metaballs';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleBackground = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="controls">
        <button className="toggle-background" onClick={toggleBackground}>
          Toggle Background
        </button>
      </div>
      <div className="metaball-wrapper">
        <Metaballs isDarkMode={isDarkMode} />
        <Metaballs isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;
