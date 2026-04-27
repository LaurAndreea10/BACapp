# Scripturi de mentenanță

Poți rula scripturile direct cu `node` sau prin comenzile din `package.json`.

## Comenzi rapide

```bash
npm run fix:head
npm run verify
npm run serve
```

## `fix-index-head.mjs`

Curăță începutul din `index.html` după integrarea PWA/CSS.

Rulează local din rădăcina repository-ului:

```bash
node scripts/fix-index-head.mjs
```

sau:

```bash
npm run fix:head
```

Ce face:

- înlocuiește începutul invalid al fișierului cu un `<head>` curat
- păstrează restul HTML/CSS/JS din aplicație
- verifică să nu mai existe pattern-uri de tip `<link>` sau `<script>` în interiorul `<style>`
- verifică să nu mai existe `:root{` duplicat consecutiv

După rulare:

```bash
git diff index.html
git status
```

## `verify-static-site.mjs`

Verifică dacă fișierele statice principale există și dacă `index.html` nu mai conține pattern-urile care au rupt stilizarea.

Rulează:

```bash
node scripts/verify-static-site.mjs
```

sau:

```bash
npm run verify
```

Verifică:

- `index.html`
- `styles.css`
- `ai-coach-presets.js`
- `pwa-register.js`
- `service-worker.js`
- `manifest.webmanifest`
- `offline.html`
- `404.html`
- iconițele PWA
- `start_url` și `scope` din manifest

## Server local

```bash
npm run serve
```

Apoi deschide:

```text
http://localhost:8000
```
