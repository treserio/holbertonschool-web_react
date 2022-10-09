import React from 'react';
import './Header.css';
import Holb_Logo from '../assets/Holb_Logo.jpg';


export default function Header() {
  return (
    <React.Fragment>
      <img src={Holb_Logo} className="App-logo" alt="logo" />
      <h1>School dashboard</h1>
    </React.Fragment>
  )
}
