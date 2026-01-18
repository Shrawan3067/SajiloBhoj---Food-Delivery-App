import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.js';

const rootEl = document.getElementById('root') as HTMLElement;
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
