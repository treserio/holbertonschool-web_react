import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Holb_Logo from '../assets/Holb_Logo.jpg';


export default function Header() {

  const style =  StyleSheet.create({
    logo: {
      width: '240px',
      height: '240px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: 'medium solid red',
      borderBottomColor: 'red',
    },
  });

  return (
    <header className={`App-header ${css(style.header)}`} >
      <img src={Holb_Logo} className={`App-logo ${css(style.logo)}`} alt="logo" />
      <h1>School dashboard</h1>
    </header>
  )
}
