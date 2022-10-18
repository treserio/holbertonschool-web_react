import React from 'react';
import { css, StyleSheet } from 'aphrodite';

export default function Login({
  handleLoginSubmit,
  email,
  password,
  handleChangeEmail,
  handleChangePassword,
}) {
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
            value={email}
            onChange={handleChangeEmail}
          />
        </label>
        <label htmlFor="password" className={css(style.label)} >Password:
          <input
            className={css(style.emailPass)}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <input type="submit" value="OK" className={css(style.button)} />
      </form>
    </React.Fragment>
  )
}
