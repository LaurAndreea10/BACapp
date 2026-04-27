# Patch final pentru `<head>` în `index.html`

Site-ul funcționează momentan prin `styles.css` încărcat de `ai-coach-presets.js`, dar începutul din `index.html` trebuie curățat definitiv.

## Starea greșită care trebuie eliminată

În `index.html`, la începutul fișierului, există un bloc de forma:

```html
<script src="/BACapp/ai-coach-presets.js"></script>
<style>
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<link rel="manifest" href="/BACapp/manifest.webmanifest">
<link rel="icon" href="/BACapp/icons/icon-192.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/BACapp/icons/icon-192.svg">

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="/BACapp/ai-coach-presets.js"></script>
<script src="/BACapp/pwa-register.js" defer></script>

<style>
:root{
:root{
```

Acest bloc este invalid deoarece conține `<link>` și `<script>` în interiorul `<style>`.

## Înlocuire recomandată

Înlocuiește tot începutul până la primul `:root{` real cu:

```html
<!DOCTYPE html>
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
<script src="/BACapp/pwa-register.js" defer></script>

<style>
:root{
```

Atenție: după acest patch trebuie să existe un singur `<style>` la început și un singur `:root{` consecutiv.

## Checklist după patch

- [ ] În `<head>` nu există `<link>` sau `<script>` după `<style>` și înainte de `</style>`.
- [ ] Nu există `<style><style>` consecutiv.
- [ ] Nu există `:root{\n:root{` consecutiv.
- [ ] `/BACapp/styles.css` se încarcă în Network.
- [ ] `/BACapp/ai-coach-presets.js` se încarcă în Network.
- [ ] `/BACapp/pwa-register.js` se încarcă în Network.
- [ ] DevTools → Application afișează manifestul.
- [ ] Sidebar-ul și tema dark/gold arată corect.
- [ ] AI Coach răspunde local, fără configurare externă.
