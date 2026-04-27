# Scripturi de mentenanță

## `fix-index-head.mjs`

Curăță începutul din `index.html` după integrarea PWA/CSS.

Rulează local din rădăcina repository-ului:

```bash
node scripts/fix-index-head.mjs
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

Apoi testează aplicația local sau pe GitHub Pages.
