# 🎓 BAC Space

> Simulator educațional static pentru pregătirea examenului de Bacalaureat din România.

🔗 **Live demo:** https://laurandreea10.github.io/BACapp/

---

## ⚠️ Mențiune importantă

**BAC Space este doar un simulator educațional pentru pregătire și antrenament.**

Aplicația nu este o platformă oficială a Ministerului Educației, nu reprezintă o instituție publică și nu garantează rezultatul la examenul real. Conținutul, quiz-urile, simulările și răspunsurile AI Coach trebuie folosite ca suport de învățare, alături de programa oficială, profesor și materiale aprobate.

Politica de confidențialitate: [`PRIVACY.md`](./PRIVACY.md)

---

## ✨ Prezentare

**BAC Space** este o aplicație web pentru elevii care se pregătesc pentru Bacalaureat. Include lecții, quiz-uri, simulări, eseuri-model, hartă interactivă, Pomodoro, calendar de recapitulare, AI Coach local, **Alege traseul tău**, **BAC Pack**, flux complet la **Română**, flux complet **Istorie + Geografie** și flux complet **Matematică + Științe**.

Aplicația este gândită ca un spațiu de învățare structurat, motivant și accesibil. Progresul este salvat local în browser, iar site-ul funcționează ca PWA.

---

## 🚀 Funcționalități principale

- 🧭 **Alege traseul tău** cu 3 carduri principale: Română, Uman, Real/Științe
- 🏠 **Dashboard** cu XP, nivel, streak și progres
- 📚 **Materii & lecții** pentru învățare structurată
- 🇷🇴 **Flux complet Română**: onboarding 7 zile, lecții, quiz, XP, recapitulări și progres local
- 🏛️ **Flux complet Istorie + Geografie**: lecții, quiz, XP, fișe rapide și progres local pentru profil uman
- 🔬 **Flux complet Matematică + Științe**: lecții, quiz, XP, fișe rapide și progres local pentru profil real/științe
- 📚 **BAC Pack** cu lecții rapide, simulare pe profil, raport și reset progres
- ❓ **Quiz-uri interactive** cu statistici de acuratețe
- 🎯 **Mod greșeli** pentru refacerea întrebărilor dificile
- 🔁 **Recapitulări spațiate** 1-3-7-14-30 zile
- 🗺️ **Geografie & hărți** cu Leaflet
- 📝 **Simulare BAC** cu cronometru
- ✍️ **Modele de eseuri** și ghidaj de redactare
- 🎲 **Generator de subiecte** pentru antrenament
- 🍅 **Pomodoro** pentru sesiuni concentrate
- 📅 **Calendar** pentru planificare
- 🤖 **AI Coach local**, fără API extern și fără costuri
- ♿ **Panou de accesibilitate** cu contrast ridicat, text mărit, citire ușoară, fără distrageri și citire vocală
- 📲 **PWA-ready**: manifest, service worker, iconițe și pagină offline

---

## 🧭 Alege traseul tău

Secțiunea de start organizează fluxurile mari în 3 carduri clare:

- **Română**: eseu, poezie, argumentativ, quiz și progres;
- **Uman**: Istorie + Geografie, plan 7 zile, lecții, quiz și fișe;
- **Real / Științe**: Matematică, Biologie, Chimie, Fizică, quiz și formule.

Fiecare card trimite direct la fluxul potrivit, reducând aglomerația pentru utilizatorii noi.

Fișiere:

- `learning-paths.css`
- `learning-paths.js`

---

## 🇷🇴 Flux complet Română

Modulul Română demonstrează o experiență completă de învățare:

- onboarding „Start 7 zile”;
- 3 lecții reale: eseu la roman, poezie modernistă, text argumentativ;
- quiz aferent fiecărei lecții;
- XP local pentru lecții, quiz și fișe rapide;
- recapitulări recente;
- modele de eseu;
- 5 fișe rapide;
- 10 termeni de glosar;
- clarificare că AI Coach/generatorul/corectarea sunt orientative și nu înlocuiesc baremul oficial.

Fișiere:

- `romanian-flow.css`
- `romanian-flow.js`

---

## 🏛️ Flux complet Istorie + Geografie

Modulul Istorie + Geografie extinde experiența completă pentru profilul uman:

- plan de 7 zile;
- 3 lecții reale la Istorie: constituțiile României, comunismul, romanitatea românilor;
- 3 lecții reale la Geografie: relieful României, clima României, Europa;
- quiz aferent fiecărei lecții;
- XP local pentru lecții, quiz și fișe rapide;
- fișe rapide cu termeni-cheie;
- progres local și activitate recentă.

Fișiere:

- `history-geography-flow.css`
- `history-geography-flow.js`

---

## 🔬 Flux complet Matematică + Științe

Modulul Matematică + Științe extinde experiența completă pentru profil real/științe:

- plan de 7 zile;
- lecții Matematică: funcții/tabel de variație, integrale/primitive;
- lecții Biologie: genetică, anatomie;
- lecții Chimie: stoichiometrie, pH/acizi și baze;
- lecții Fizică: mecanică, electricitate/legea lui Ohm;
- quiz aferent fiecărei lecții;
- XP local pentru lecții, quiz și fișe rapide;
- fișe rapide cu formule și termeni-cheie;
- progres local și activitate recentă.

Fișiere:

- `math-science-flow.css`
- `math-science-flow.js`

---

## 📚 BAC Pack

BAC Pack adaugă un modul educațional rapid, integrat direct în aplicație:

- lecții rapide pentru română, istorie, geografie și profil real/științe;
- simulare BAC pe profil: Real, Uman, Tehnologic, Științe ale naturii;
- raport după simulare cu scor estimativ, greșeli și recomandări pentru următoarea sesiune;
- buton **Reset progres** cu două confirmări înainte de ștergerea datelor locale.

Fișiere:

- `education-pack.css`
- `education-pack.js`

---

## 🔒 Confidențialitate

BAC Space nu colectează, nu vinde și nu transmite către dezvoltator date personale introduse în aplicație.

Date precum progresul, XP-ul, streak-ul, răspunsurile la quiz-uri și setările de accesibilitate sunt salvate local în browser, prin `localStorage` și cache PWA.

AI Coach rulează local, cu răspunsuri presetate. Nu trimite întrebările către Anthropic, OpenAI sau alt serviciu AI.

Detalii: [`PRIVACY.md`](./PRIVACY.md)

---

## ♿ Accesibilitate

BAC Space include un strat dedicat de accesibilitate:

- link **Sari la conținut**
- focus vizibil pentru tastatură
- navigare mai bună cu `Tab`, `Enter` și `Space`
- panou flotant **♿**
- mod **Contrast ridicat**
- mod **Text mărit**
- mod **Citire ușoară**
- mod **Fără distrageri**
- mod **Mișcare redusă**
- butoane **Citește textul** și **Oprește**
- ARIA/landmark-uri pentru zone principale, AI Coach și hartă

Detalii și checklist: [`ACCESSIBILITY.md`](./ACCESSIBILITY.md)

---

## 🤖 AI Coach local

AI Coach funcționează cu răspunsuri presetate, direct în browser.

- nu folosește Anthropic/OpenAI/API extern
- nu cere API key
- nu consumă tokeni
- include întrebări sugerate grupate pe categorii
- acoperă plan de studiu, română, istorie, geografie, matematică, biologie, chimie, fizică, simulare și stres

---

## 🛠️ Tehnologii

- HTML
- CSS
- JavaScript vanilla
- Leaflet pentru hărți interactive
- Web App Manifest
- Service Worker
- GitHub Pages
- GitHub Actions
- Lighthouse CI

---

## ▶️ Rulare locală

```bash
git clone https://github.com/LaurAndreea10/BACapp.git
cd BACapp
npm run serve
```

Apoi deschide:

```text
http://localhost:8000
```

Alternativ:

```bash
python3 -m http.server 8000
```

---

## ✅ Comenzi utile

```bash
npm run fix:head
npm run verify
npm run serve
```

- `fix:head` curăță începutul din `index.html`
- `verify` verifică fișierele statice/PWA și probleme comune în head
- `serve` pornește server local simplu

---

## 🔍 Verificări automate

Repository-ul include workflow-uri GitHub Actions pentru:

- verificare statică a site-ului
- curățarea/legarea automată a fișierelor critice în `index.html`
- audit Lighthouse pentru accessibility, best practices și performance

Configurație Lighthouse: [`lighthouserc.json`](./lighthouserc.json)

---

## 📲 PWA / offline

Fișiere principale:

- `manifest.webmanifest`
- `service-worker.js`
- `pwa-register.js`
- `offline.html`
- `icons/icon-192.svg`
- `icons/icon-512.svg`

Service worker-ul folosește cache versionat și strategie network-first pentru asset-uri locale `.js`, `.css`, `.md` și `.webmanifest`.

---

## 🌐 Publicare

Site-ul este publicat prin **GitHub Pages**:

https://laurandreea10.github.io/BACapp/

După modificări în `main`, GitHub Pages poate avea nevoie de câteva minute pentru publicare.

---

## 🧪 Testare manuală recomandată

- hard refresh după modificări mari
- test pe mobil
- test secțiunea „Alege traseul tău”
- test banner simulator/confidențialitate
- test link `PRIVACY.md`
- test flux Română: onboarding, lecție, quiz, XP, progres
- test flux Istorie + Geografie: plan, lecții, quiz, fișe, progres
- test flux Matematică + Științe: plan, lecții, quiz, fișe, progres
- test BAC Pack: lecții, simulare, raport, reset progres
- test AI Coach cu întrebări sugerate
- test panou ♿
- test `Citește textul`
- test PWA install/offline
- test navigare doar cu tastatura

---

## 📌 Direcții viitoare

- extragerea treptată a JavaScript-ului principal din `index.html` în `app.js`
- audit complet cu screen reader real
- capturi reale în README
- extinderea conținutului cu subiecte reale pe ani/profil
- teste smoke pentru navigare, quiz și simulare
