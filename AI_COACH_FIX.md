# Fix AI Coach: răspunsuri presetate locale

`ai-coach-presets.js` este fallback-ul local pentru AI Coach.

## Important: zero costuri

Această soluție **nu folosește Anthropic**, **nu consumă tokeni**, **nu implică abonament** și **nu necesită API Key**.

În interfață, câmpurile de tip:

- `Anthropic API Key`
- `Model`
- `Șterge cheia`
- `Nu ai setat încă o cheie`

pot fi ignorate sau ascunse, deoarece AI Coach trebuie să răspundă local cu presetările din `ai-coach-presets.js`.

## De ce apărea eroarea CORS

Browserul nu poate apela direct `https://api.anthropic.com/v1/messages` dintr-un site public GitHub Pages. Anthropic nu trimite headerul `Access-Control-Allow-Origin` pentru astfel de apeluri, deci preflight-ul CORS este blocat. În plus, un apel direct din frontend ar expune cheia API în codul public.

Pentru BAC Space, soluția aleasă este una fără costuri: răspunsuri presetate locale.

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
<script src="/BACapp/ai-coach-presets.js"></script>
```

Evită `defer` aici dacă AI Coach trimite request-ul imediat după încărcarea paginii.

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

## Recomandare pentru interfață

Pentru versiunea fără costuri, ascunde sau elimină din `index.html` zona de configurare Anthropic API Key / Model. Dacă rămâne vizibilă, utilizatorii vor crede că trebuie introdusă o cheie, deși AI Coach poate funcționa local cu presetări.
