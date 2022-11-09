import React, { createContext } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../reducers/uiReducer';
import rootReducer from '../reducers/rootReducer';


const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    courses: rootReducer.courses(undefined, {}),
    notes: rootReducer.notes(undefined, {}),
    ui: rootReducer.ui(undefined, {}),
  },
  middleware: (getDefault) => getDefault({
    serializableCheck: false,
  })
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
