// Import React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import App component
import App from './App';

// Import Tailwind CSS
import './styles/globals.css';

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
