import React from 'react';
import { css, StyleSheet } from 'aphrodite';

export default function Login({ login }) {
  // could have used context here
  const [state, setState] = React.useState({
    email: '',
    password: '',
    enableSubmit: false,
  });

  const style =  StyleSheet.create({
    button: {
      '@media (max-width: 900px)': {
        width: '60px',
        float: 'right',
      },
    },
    emailPass: {
      marginLeft: '10px',
    },
    form: {
      '@media (max-width: 900px)': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    label: {
      marginRight: '25px',
      '@media (max-width: 900px)': {
        marginBottom: '10px',
      },
    },
  });

  function handleChangeEmail(event) {
    if (event.target.value && state.password) state.enableSubmit = true
    else state.enableSubmit = false;
    setState({ ...state, email: event.target.value });
  }

  function handleChangePassword(event) {
    if (state.email && event.target.value) state.enableSubmit = true
    else state.enableSubmit = false;
    setState({ ...state, password: event.target.value });
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    if (state.enableSubmit) {
      login(state.email, state.password);
    }
    else alert('Please enter email and password to proceed');
  }

  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <form className={css(style.form)} onSubmit={handleLoginSubmit}>
        <label htmlFor="email" className={css(style.label)} >Email:
          <input
            className={css(style.emailPass)}
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChangeEmail}
          />
        </label>
        <label htmlFor="password" className={css(style.label)} >Password:
          <input
            className={css(style.emailPass)}
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChangePassword}
          />
        </label>
        <input type="submit" value="OK" className={css(style.button)} />
      </form>
    </React.Fragment>
  )
}
