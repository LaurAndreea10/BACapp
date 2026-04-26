# Fix AI Coach: răspunsuri presetate

Acest branch adaugă `ai-coach-presets.js`, un fallback local pentru AI Coach.

## Ce face

- adaugă răspunsuri presetate pentru întrebări despre:
  - plan de studiu
  - greșeli la quiz
  - eseu la română
  - simulare BAC
  - stres / motivație
  - recapitulare
- încearcă să intercepteze funcțiile uzuale de trimitere (`askAI`, `aiAsk`, `sendAI`, `sendMsg`)
- adaugă helper-ul global `BAC_AI_COACH_PRESETS.answerSuggestedQuestion(question)`
- permite folosirea de butoane cu `data-ai-question` sau `data-coach-question`

## Activare în `index.html`

Adaugă înainte de `</body>`:

```html
<script src="/BACapp/ai-coach-presets.js" defer></script>
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

## Observație

Nu am modificat direct `index.html` deoarece conectorul GitHub returnează fișierul mare trunchiat înainte de secțiunea AI Coach. Modificarea directă fără fișier complet ar risca să strice pagina live.
