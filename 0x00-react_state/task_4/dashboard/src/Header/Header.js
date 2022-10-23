import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Holb_Logo from '../assets/Holb_Logo.jpg';
import AppContext from '../App/AppContext';

export default function Header() {
  const context = React.useContext(AppContext);

  const style =  StyleSheet.create({
    logo: {
      width: '240px',
      height: '240px',
    },
    header: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      borderBottom: 'medium solid red',
      borderBottomColor: 'red',
    },
    logout: {
      position: 'absolute',
      border: null,
      bottom: 0,
      right: 0,
      marginRight: '1rem',
    }
  });

  return (
    <header className={`App-header ${css(style.header)}`} >
      <img src={Holb_Logo} className={`App-logo ${css(style.logo)}`} alt="logo" />
      <h1>School dashboard</h1>
      {
        context.user.isLoggedIn ?
          <p id='logoutSection' className={css(style.logout)} >
            Welcome {context.user.email}&nbsp;<a onClick={context.logout} href='#'>(logout)</a>
          </p>
        : null
      }
    </header>
  )
}
