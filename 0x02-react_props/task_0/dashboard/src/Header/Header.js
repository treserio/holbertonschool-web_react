import React from 'react';
import Holb_Logo from '../assets/Holb_Logo.jpg';

function Header() {
  return (
    <header className="App-header">
      <img src={Holb_Logo} className="App-logo" alt="logo" />
      <h1>School dashboard</h1>
    </header>
  )
}

export default Header;
