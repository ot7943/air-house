import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export function render(url: string, context: any = {}) {
  const helmetContext = {};

  const app = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const html = renderToString(app);

  return {
    html,
    head: (helmetContext as any).helmet,
  };
}
