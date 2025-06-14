import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Set environment variables from window.ENV if available
if (typeof window !== 'undefined' && window.ENV) {
  Object.keys(window.ENV).forEach(key => {
    if (!import.meta.env[key]) {
      import.meta.env[key] = window.ENV[key];
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);