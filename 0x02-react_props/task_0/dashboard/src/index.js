import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import Notifications from './Notifications/Notifications';

ReactDOM.render(
  <React.StrictMode>
    <div id="root-notifications">
      <Notifications />
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
