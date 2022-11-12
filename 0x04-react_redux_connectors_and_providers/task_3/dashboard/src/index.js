import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ReduxApp } from './App/App';

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

ReactDOM.render(
  <React.StrictMode>
    <ReduxApp />
  </React.StrictMode>,
  document.getElementById('root')
);
