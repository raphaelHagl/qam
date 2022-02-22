import React from 'react';
import './App.css';

import { UserComponentFactory } from './UserFactory';
import { instantiateComponent } from './di-container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <div>
        { // TODO: this obviously doesn't work and `instantiateComponent` shall not be called outside the di-container
          instantiateComponent(UserComponentFactory)
        }
      </div>
    </div>
  );
}

export default App;
