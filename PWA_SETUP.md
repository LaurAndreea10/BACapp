# PWA setup pentru BAC Space

Acest branch adaugă fișierele necesare pentru ca BAC Space să poată funcționa ca Progressive Web App:

- `manifest.webmanifest`
- `service-worker.js`
- `pwa-register.js`
- `offline.html`
- iconițe SVG în `icons/`

## Activare în `index.html`

Pentru activare completă, adaugă în `<head>`:

```html
<link rel="manifest" href="/BACapp/manifest.webmanifest">
<link rel="icon" href="/BACapp/icons/icon-192.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/BACapp/icons/icon-192.svg">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="BAC Space">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

Apoi adaugă înainte de `</body>`:

```html
<script src="/BACapp/pwa-register.js" defer></script>
```

## Verificare

1. Publică site-ul pe GitHub Pages.
2. Deschide aplicația în Chrome.
3. Deschide DevTools → Application → Manifest.
4. Verifică dacă `manifest.webmanifest` este încărcat.
5. Deschide DevTools → Application → Service Workers.
6. Verifică dacă `service-worker.js` este activ.
7. Bifează Offline și reîncarcă pagina.
8. Aplicația ar trebui să afișeze shell-ul salvat sau `offline.html`.

## Observație

`index.html` este un fișier foarte mare, cu HTML, CSS și JavaScript inline. Pentru mentenanță, următorul pas recomandat este separarea codului în:

- `styles.css`
- `app.js`
- `data.js`
