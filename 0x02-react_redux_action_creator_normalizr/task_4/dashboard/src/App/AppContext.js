import React, { createContext } from 'react';

// Default user object
const user = {
  email: '',
  password: '',
  isLoggedIn: false,
};

// Default logout function
function logout() {
  this.setState({
    user: {
      email: '',
      password: '',
      isLoggedIn: false,
    }
  });
  this.context.user = {
    email: '',
    password: '',
    isLoggedIn: false,
  };
};

// Create context object with default values
// passing app.state as prop to this rendering of .Provider, don't understand defaults
const AppContext = createContext({
  user,
  logout,
});

export default AppContext;
