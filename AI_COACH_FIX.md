# Fix AI Coach: răspunsuri presetate

`ai-coach-presets.js` este fallback-ul local pentru AI Coach.

## De ce era eroarea CORS

Browserul nu poate apela direct `https://api.anthropic.com/v1/messages` dintr-un site public GitHub Pages. Anthropic nu trimite headerul `Access-Control-Allow-Origin` pentru astfel de apeluri, deci preflight-ul CORS este blocat. În plus, un apel direct din frontend ar expune cheia API în codul public.

Soluția corectă pentru AI real ar fi un backend/proxy server-side. Pentru această aplicație statică, folosim răspunsuri presetate locale.

## Ce face scriptul

- adaugă răspunsuri presetate pentru întrebări despre:
  - plan de studiu
  - greșeli la quiz
  - eseu la română
  - simulare BAC
  - stres / motivație
  - recapitulare
- interceptează apelurile directe către `api.anthropic.com/v1/messages` și returnează un răspuns local compatibil cu forma răspunsului Anthropic
- încearcă să intercepteze funcțiile uzuale de trimitere (`askAI`, `aiAsk`, `sendAI`, `sendMsg`)
- adaugă helper-ul global `BAC_AI_COACH_PRESETS.answerSuggestedQuestion(question)`
- permite folosirea de butoane cu `data-ai-question`, `data-coach-question`, `.ai-suggestion` sau `.coach-suggestion`

## Activare în `index.html`

Adaugă scriptul cât mai devreme posibil, ideal în `<head>` după scripturile externe, ca să poată intercepta `fetch` înainte ca AI Coach să trimită request-ul:

```html
<script src="/BACapp/ai-coach-presets.js" defer></script>
```

Dacă AI Coach definește și apelează codul foarte devreme, folosește fără `defer`:

```html
<script src="/BACapp/ai-coach-presets.js"></script>
```

## Pentru întrebările sugerate

Dacă există butoane de tip sugestie în AI Coach, poți face una dintre variantele de mai jos:

### Variantă recomandată

```html
<button class="bt ai-suggestion" data-ai-question="Cum îmi fac un plan de studiu pentru azi?">
  Cum îmi fac un plan de studiu pentru azi?
</button>
```

Scriptul va detecta click-ul și va afișa automat răspunsul presetat.

### Variantă explicită

```html
<button class="bt" onclick="BAC_AI_COACH_PRESETS.answerSuggestedQuestion('Cum repar greșelile din quiz?')">
  Cum repar greșelile din quiz?
</button>
```

## Recomandare pe termen lung

Elimină complet din `index.html` apelul direct către `https://api.anthropic.com/v1/messages`. Pentru AI real, folosește un endpoint backend, de exemplu Cloudflare Worker, Netlify Function sau Vercel Function, unde cheia API rămâne server-side.
