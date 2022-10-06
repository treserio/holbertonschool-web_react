import React from 'react';
import Holb_Logo from '../assets/Holb_Logo.jpg';
import './App.css';
import { getFullYear, getFooterCopy } from '../utils/utils';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Holb_Logo} className="App-logo" alt="logo" />
        <h1>School dashboard</h1>
      </header>
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
      <div className='App-footer'>
        <p>Copyright {getFullYear()} - {getFooterCopy(0)}</p>
      </div>
    </div>
  );
}

export default App;
