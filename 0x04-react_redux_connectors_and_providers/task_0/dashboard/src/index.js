import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './reducers/uiReducer';

const store = configureStore({
  reducer: uiReducer,
  preloadedState: {
    ui: uiReducer({}),
  },
});

console.log(store)
console.log(store.getState())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
