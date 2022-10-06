import React from 'react';
import './App.css';
import { getFullYear, getFooterCopy } from '../utils/utils';

function App() {
  return (
    <div className="App">
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">
            Email:
            <input type="email" id="email" name="email" />
          </label>
          <label htmlFor="password">
            Password:
            <input type="password" id="password" name="password" />
          </label>
          <input type="submit" value="OK" />
        </form>
      </div>
    </div>
  );
}

export default App;
