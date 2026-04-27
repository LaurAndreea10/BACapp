import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'index.html',
  'styles.css',
  'ai-coach-presets.js',
  'quiz-arena.js',
  'pwa-register.js',
  'service-worker.js',
  'manifest.webmanifest',
  'offline.html',
  '404.html',
  'icons/icon-192.svg',
  'icons/icon-512.svg'
];

const missing = requiredFiles.filter(file => !existsSync(file));
if (missing.length) {
  console.error('Missing required files:');
  missing.forEach(file => console.error(`- ${file}`));
  process.exit(1);
}

const index = readFileSync('index.html', 'utf8');
const checks = [
  ['loads styles.css', index.includes('/BACapp/styles.css') || index.includes('styles.css')],
  ['loads ai-coach-presets.js', index.includes('/BACapp/ai-coach-presets.js')],
  ['loads quiz-arena.js', index.includes('/BACapp/quiz-arena.js')],
  ['loads manifest', index.includes('/BACapp/manifest.webmanifest') || index.includes('manifest.webmanifest')],
  ['does not contain duplicated :root near top', !index.includes(':root{\n:root{') && !index.includes(':root{\r\n:root{')],
  ['does not contain nested style tags', !index.includes('<style>\n<style>') && !index.includes('<style>\r\n<style>')],
  ['does not contain link tag immediately inside style', !index.includes('<style>\n <link') && !index.includes('<style>\n<link') && !index.includes('<style>\r\n <link') && !index.includes('<style>\r\n<link')]
];

const failed = checks.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('Static site verification failed:');
  failed.forEach(([name]) => console.error(`- ${name}`));
  process.exit(1);
}

const manifest = JSON.parse(readFileSync('manifest.webmanifest', 'utf8'));
if (manifest.start_url !== '/BACapp/' || manifest.scope !== '/BACapp/') {
  console.error('Manifest start_url/scope should both be /BACapp/.');
  process.exit(1);
}

console.log('Static site verification passed.');
