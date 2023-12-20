import './App.css';

import Bonus from './components/Bonus';
import { Icon } from './Model/icon';
import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Bonus
        icon={Icon.Money}
        value={'5'}
      />
      <Bonus
        icon={Icon.Multiplier}
      />
      <Bonus
        icon={Icon.Bonus}
      />
    </div>
  );
}

export default App;
