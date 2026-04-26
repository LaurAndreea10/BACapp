# 🎓 BAC Space

> Platformă educațională modernă pentru pregătirea eficientă a examenului de Bacalaureat din România.

🔗 **Live demo:** [BAC Space](https://laurandreea10.github.io/BACapp/)

---

## ✨ Prezentare

**BAC Space** este o aplicație web statică pentru elevii care se pregătesc pentru examenul de **Bacalaureat**. Aplicația combină lecții, quiz-uri, simulări, eseuri-model și instrumente de productivitate într-o interfață unitară.

Scopul proiectului este să ofere un spațiu de învățare structurat, motivant și ușor de folosit, cu progres salvat local în browser.

---

## 🚀 Funcționalități principale

- 🏠 **Dashboard** cu XP, nivel, streak și progres
- 📚 **Materii & lecții** pentru învățare structurată
- ❓ **Quiz-uri interactive** cu statistici de acuratețe
- 🎯 **Mod greșeli** pentru refacerea întrebărilor dificile
- 🔁 **Recapitulări spațiate** 1-3-7-14-30 zile
- 🗺️ **Geografie & hărți** pentru învățare vizuală
- 📝 **Simulare BAC** cu cronometru
- ✍️ **Modele de eseuri** și ghidaj de redactare
- 🎲 **Generator de subiecte** pentru antrenament
- 🍅 **Pomodoro** pentru sesiuni de studiu concentrate
- 📅 **Calendar** pentru planificarea recapitulărilor
- 🤖 **AI Coach**, fișe rapide, glosar, achievements și statistici

---

## 🛠️ Tehnologii

Proiectul este un site static construit cu:

- HTML
- CSS
- JavaScript vanilla
- Leaflet pentru hărți interactive
- GitHub Pages pentru publicare

Nu necesită build step sau dependențe locale.

---

## ▶️ Rulare locală

Clonează repository-ul și pornește un server static:

```bash
git clone https://github.com/LaurAndreea10/BACapp.git
cd BACapp
python3 -m http.server 8000
```

Apoi deschide în browser:

```text
http://localhost:8000
```

---

## 🌐 Publicare

Site-ul este publicat prin **GitHub Pages** la:

👉 [https://laurandreea10.github.io/BACapp/](https://laurandreea10.github.io/BACapp/)

Modificările ajunse în branch-ul principal vor fi reflectate pe site după procesarea GitHub Pages.

---

## 📌 Îmbunătățiri recomandate în continuare

- separarea CSS și JavaScript în fișiere dedicate
- adăugarea unui manifest PWA și a unui service worker pentru folosire offline
- adăugarea de teste smoke pentru navigare, quiz și simulare
- optimizarea accesibilității pentru tastatură și cititoare de ecran
- adăugarea de capturi reale în secțiunea de preview

---

## 📷 Preview

Adaugă capturi în `assets/`, apoi actualizează această secțiune:

```md
![Dashboard](./assets/dashboard.png)
![Quiz](./assets/quiz.png)
![Simulation](./assets/simulation.png)
```
