# Accesibilitate BAC Space

Acest document notează măsurile de accesibilitate implementate și pașii următori pentru îmbunătățiri.

## Implementat

### Navigare cu tastatura

- Link `Sari la conținut` pentru a evita meniul repetitiv.
- Focus vizibil pentru utilizatorii care navighează cu tastatura.
- Activare cu `Enter` și `Space` pentru elemente clickabile care nu sunt butoane native.
- `aria-current` pentru elementul activ din navigația laterală.

### Suport vizual

- Mod `Contrast ridicat`.
- Mod `Text mărit`.
- Mod `Citire ușoară`, cu font mai simplu, spațiere mai mare și decoruri reduse.
- Respectarea preferinței sistemului `prefers-reduced-motion`.
- Mod manual `Mișcare redusă`.

### Reducerea distragerilor

- Mod `Fără distrageri`.
- Ascunde elemente decorative și reduce efectele vizuale.
- Limitează focusul vizual către conținutul activ.

### Citire vocală

- Buton `Citește textul`.
- Buton `Oprește`.
- Folosește Web Speech API când este disponibil în browser.
- Citește conținutul secțiunii active.

### Screen readere și ARIA

- `role="main"` pentru conținutul principal.
- `role="navigation"` pentru meniul lateral.
- `role="region"` pentru panourile principale.
- `role="log"` și `aria-live="polite"` pentru conversația AI Coach.
- Live region global pentru anunțuri scurte.
- Etichete ARIA suplimentare pentru hartă și zone interactive.

### Persistență

- Setările de accesibilitate sunt salvate în `localStorage`.
- Setările rămân după refresh.

## Testare manuală recomandată

- Navigare doar cu tastatura: `Tab`, `Shift + Tab`, `Enter`, `Space`.
- Verificare focus vizibil pe toate controalele importante.
- Activare/dezactivare: contrast ridicat, text mărit, citire ușoară, fără distrageri, mișcare redusă.
- Testare `Citește textul` în Dashboard, Lecții, Quiz și AI Coach.
- Testare pe mobil.
- Testare cu screen reader: NVDA, VoiceOver sau TalkBack.

## Checklist WCAG orientativ

### Perceptibil

- [x] Contrast ridicat disponibil.
- [x] Text mărit disponibil.
- [x] Mișcare redusă disponibilă.
- [x] Conținutul activ poate fi citit vocal.
- [ ] Verificare completă contrast pe toate componentele cu unealtă dedicată.
- [ ] Alternative text pentru toate iconițele informative.

### Operabil

- [x] Navigare cu tastatura.
- [x] Focus vizibil.
- [x] Skip link.
- [x] Activare cu Enter/Space pentru elemente interactive custom.
- [ ] Test complet al ordinii de focus pe toate paginile.

### Inteligibil

- [x] Mod citire ușoară.
- [x] Mod fără distrageri.
- [x] Etichete mai clare pentru zone principale.
- [ ] Mesaje de eroare mai explicite în formulare și quiz.

### Robust

- [x] Landmark-uri ARIA principale.
- [x] Live region pentru anunțuri.
- [x] Roluri suplimentare pentru chat și hartă.
- [ ] Audit automat cu Lighthouse/axe.
- [ ] Testare cu cel puțin un screen reader real.

## Limitări cunoscute

- Citirea vocală depinde de suportul browserului pentru Web Speech API.
- Harta interactivă poate necesita ajustări suplimentare pentru screen readere.
- Unele elemente sunt generate dinamic, deci pot necesita audit periodic.
