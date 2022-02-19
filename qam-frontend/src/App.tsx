import React from 'react';
import logo from './logo.svg';
import './App.css';

import { UserComponentFactory } from './UserFactory';
import { instantiateComponent } from './di-container';

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
      <div>
        {instantiateComponent(UserComponentFactory)}
      </div>
    </div>
  );
}

export default App;
