import { readFileSync, writeFileSync } from 'node:fs';

const INDEX_PATH = 'index.html';

const cleanHead = `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#06090f">
<title>BAC Space Premium</title>

<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=Manrope:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<link rel="stylesheet" href="/BACapp/styles.css">
<link rel="manifest" href="/BACapp/manifest.webmanifest">
<link rel="icon" href="/BACapp/icons/icon-192.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/BACapp/icons/icon-192.svg">

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="/BACapp/ai-coach-presets.js"></script>
<script src="/BACapp/quiz-arena.js" defer></script>
<script src="/BACapp/pwa-register.js" defer></script>

<style>
`;

let html = readFileSync(INDEX_PATH, 'utf8');

// The current broken file contains duplicated <style> and duplicated :root{ near the top.
// Keep the real CSS body starting from the first CSS variable declaration after the broken markup.
const marker = '--bg:#06090f;';
const markerIndex = html.indexOf(marker);
if (markerIndex === -1) {
  throw new Error(`Could not find CSS marker ${marker} in ${INDEX_PATH}`);
}

const firstRootBeforeMarker = html.lastIndexOf(':root{', markerIndex);
if (firstRootBeforeMarker === -1) {
  throw new Error('Could not find :root{ before CSS marker.');
}

const rest = html.slice(markerIndex);
html = `${cleanHead}:root{\n${rest}`;

if (!html.includes('/BACapp/quiz-arena.js')) {
  html = html.replace('</body>', '<script src="/BACapp/quiz-arena.js" defer></script>\n</body>');
}

const invalidPatterns = [
  '<style>\n <link',
  '<style>\n<link',
  '<style>\r\n <link',
  '<style>\r\n<link',
  '<style>\n<style>',
  ':root{\n:root{',
  ':root{\r\n:root{'
];

const remainingInvalid = invalidPatterns.filter(pattern => html.includes(pattern));
if (remainingInvalid.length > 0) {
  throw new Error(`index.html still contains invalid head patterns: ${remainingInvalid.join(', ')}`);
}

writeFileSync(INDEX_PATH, html, 'utf8');
console.log('index.html head cleaned successfully and Quiz Arena linked.');
