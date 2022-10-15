import React from 'react';
import { css, StyleSheet } from 'aphrodite';

export default function Login() {
  const style =  StyleSheet.create({
    label: {
      marginRight: '25px',
    },
    ep: {
      marginLeft: '10px',
    }
  });

  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <form className="Login">
        <label htmlFor="email" className={css(style.label)} >Email:
          <input className={css(style.ep)} type="email" id="email" name="email" />
        </label>
        <label htmlFor="password" className={css(style.label)} >Password:
          <input className={css(style.ep)} type="password" id="password" name="password" />
        </label>
        <input type="submit" value="OK" />
      </form>
    </React.Fragment>
  )
}
