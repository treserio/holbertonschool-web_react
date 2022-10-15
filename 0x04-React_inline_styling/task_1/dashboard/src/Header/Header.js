import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Holb_Logo from '../assets/Holb_Logo.jpg';


export default function Header() {

  const style =  StyleSheet.create({
    'logo': {
      width: '240px',
      height: '240px',
    },
  });

  return (
    <React.Fragment>
      <img src={Holb_Logo} className={`App-logo ${css(style.logo)}`} alt="logo" />
      <h1>School dashboard</h1>
    </React.Fragment>
  )
}
