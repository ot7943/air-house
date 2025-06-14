import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found');
}

const renderApp = (Renderer: typeof hydrateRoot | typeof createRoot) => {
  const root = Renderer === hydrateRoot
    ? hydrateRoot(container, renderElement())
    : createRoot(container).render(renderElement());
};

const renderElement = () => (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

try {
  renderApp(hydrateRoot);
} catch (err) {
  console.error('Hydration failed. Falling back to client render.', err);
  renderApp(createRoot);
}
