import { readFileSync, writeFileSync } from 'node:fs';

const INDEX_PATH = 'index.html';
let html = readFileSync(INDEX_PATH, 'utf8');
let changed = false;

if (!html.includes('/BACapp/accessibility.css')) {
  const anchor = '<link rel="stylesheet" href="/BACapp/styles.css">';
  if (!html.includes(anchor)) throw new Error('Could not find styles.css link in index.html');
  html = html.replace(anchor, `${anchor}\n<link rel="stylesheet" href="/BACapp/accessibility.css">`);
  changed = true;
}

if (!html.includes('/BACapp/accessibility.js')) {
  const anchor = '<script src="/BACapp/pwa-register.js" defer></script>';
  if (!html.includes(anchor)) throw new Error('Could not find pwa-register.js script in index.html');
  html = html.replace(anchor, `${anchor}\n<script src="/BACapp/accessibility.js" defer></script>`);
  changed = true;
}

if (!changed) {
  console.log('Accessibility assets are already linked in index.html.');
  process.exit(0);
}

writeFileSync(INDEX_PATH, html, 'utf8');
console.log('Accessibility assets linked directly in index.html.');
