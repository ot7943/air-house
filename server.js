import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import compression from 'compression';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
  ? fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')
  : '';
const ssrManifest = isProduction
  ? fs.readFileSync(path.resolve(__dirname, 'dist/.vite/ssr-manifest.json'), 'utf-8')
  : undefined;

// Create http server
const app = express();

// Add compression middleware
app.use(compression());

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  });
  app.use(vite.ssrLoadModule);
} else {
  app.use(base, express.static(path.resolve(__dirname, 'dist'), { index: false }));
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url, {});
    const { html: appHtml, helmetContext } = rendered;
    
    // Extract helmet data
    const { helmet } = helmetContext;
    
    // Replace placeholders in template
    let html = template
      .replace(`<!--app-head-->`, helmet ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ].join('\n') : '')
      .replace(`<!--app-html-->`, appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    if (!isProduction) {
      vite?.ssrFixStacktrace(e);
    }
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});