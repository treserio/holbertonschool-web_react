import React, { createContext } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../reducers/uiReducer';

const store = configureStore({
  reducer: uiReducer,
  preloadedState: {
    ui: uiReducer(undefined, {}),
  },
  middleware: (getDefault) => getDefault({ serializableCheck: false })
});

// Default user object
const user = {
  email: 'App',
  password: 'Context',
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
const AppContext = createContext({
  user,
  logout,
  store,
});

export default AppContext;
