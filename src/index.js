import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "./fulminata.css";
import { UserProvider } from './contexts/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
