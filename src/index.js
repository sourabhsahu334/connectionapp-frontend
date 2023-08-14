// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DarkModeProvider } from './screens/darkmode'; // Import the context provider

ReactDOM.render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
