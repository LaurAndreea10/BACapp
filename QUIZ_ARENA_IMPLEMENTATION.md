# Quiz Arena implementation

Implemented as a GitHub Pages friendly JavaScript module.

## Files

- `quiz-arena.js` — injects the Quiz Arena UI and quiz logic into the existing static page.
- `public-polish.js` — loads `/BACapp/quiz-arena.js` and adds a homepage action for Quiz Arena.

## Features included

- Quiz-uri pe materii: Română, Matematică, Istorie, Geografie, Biologie, Chimie, Fizică, Informatică.
- Dificultăți: Ușor, Mediu, Greu.
- Feedback imediat după fiecare răspuns.
- XP pentru răspunsuri corecte.
- Streak și serie maximă de răspunsuri corecte.
- Quiz zilnic cu protecție pentru o singură completare pe zi.
- Quiz după lecție, legat de lecția-model de Română.
- Simulare BAC mixtă cu scor procentual.
- Bancă „De repetat” pentru întrebările greșite.
- Achievements: Quiz Starter, Minte rapidă, 10 corecte la rând, Prima notă de 10, Regele recapitulării, BAC Ready.
- Persistență locală prin `localStorage`, compatibilă cu progresul existent `bac_public_state`.

## Testare manuală recomandată

1. Deschide aplicația pe GitHub Pages.
2. Verifică apariția secțiunii `Quiz Arena` după zona `Primul quiz`.
3. Rulează un quiz pe materie și verifică feedbackul, XP-ul și contorul de răspunsuri corecte.
4. Alege un răspuns greșit și verifică apariția în `De repetat`.
5. Rulează modul `Quiz zilnic` și confirmă blocarea celei de-a doua încercări în aceeași zi.
6. Rulează `Simulare BAC` și confirmă actualizarea achievementului `BAC Ready` când scorul este cel puțin 80%.
