import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <React.Fragment>
      <p>Login to access the full dashboard</p>
      <form className="Login">
        <label htmlFor="email">Email:
          <input type="email" id="email" name="email" />
        </label>
        <label htmlFor="password">Password:
          <input type="password" id="password" name="password" />
        </label>
        <input type="submit" value="OK" />
      </form>
    </React.Fragment>
  )
}
