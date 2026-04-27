# Politica de confidențialitate BAC Space

Ultima actualizare: 27 aprilie 2026

## 1. Despre aplicație

BAC Space este un simulator educațional pentru pregătirea examenului de Bacalaureat. Aplicația este creată pentru studiu, recapitulare și antrenament.

BAC Space nu este o platformă oficială a Ministerului Educației, nu reprezintă o instituție publică și nu garantează rezultatul la examenul real.

## 2. Date colectate

BAC Space nu colectează, nu vinde și nu transmite către dezvoltator date personale introduse în aplicație.

Majoritatea datelor aplicației sunt salvate local în browserul utilizatorului, prin tehnologii precum `localStorage` și cache PWA.

Exemple de date salvate local:

- progresul la lecții;
- XP, streak și statistici;
- răspunsuri la quiz-uri;
- setări de accesibilitate;
- preferințe locale ale aplicației.

Aceste date rămân pe dispozitivul utilizatorului, cu excepția cazului în care browserul, extensiile, sistemul de operare sau utilizatorul le șterge ori le sincronizează prin servicii externe proprii.

## 3. AI Coach

AI Coach funcționează local, cu răspunsuri presetate.

- nu folosește API extern;
- nu necesită cheie API;
- nu trimite întrebările către Anthropic, OpenAI sau alt serviciu AI;
- nu consumă tokeni;
- nu creează profiluri ale utilizatorilor.

## 4. PWA și cache offline

Aplicația folosește un service worker pentru funcții PWA, cache și acces offline.

Browserul poate salva local fișiere precum:

- HTML;
- CSS;
- JavaScript;
- iconițe;
- manifest PWA;
- pagină offline.

Acest cache este folosit doar pentru ca aplicația să se încarce mai rapid și să poată funcționa parțial offline.

## 5. Servicii terțe

Aplicația poate încărca unele resurse publice din servicii terțe, de exemplu:

- Google Fonts;
- Leaflet prin CDN public.

Aceste servicii pot procesa informații tehnice de bază ale browserului, conform propriilor politici.

## 6. GitHub Pages

Site-ul este găzduit prin GitHub Pages. GitHub poate procesa date tehnice de acces, cum ar fi adresa IP, user agent-ul și loguri de securitate, conform politicilor GitHub.

## 7. Ștergerea datelor locale

Utilizatorul poate șterge datele locale prin:

- setările browserului;
- ștergerea datelor site-ului pentru `laurandreea10.github.io`;
- dezinstalarea PWA-ului;
- resetarea cache-ului/service worker-ului din DevTools.

## 8. Limitări

BAC Space este oferit ca instrument educațional. Informațiile, simulările, quiz-urile și răspunsurile presetate trebuie folosite pentru pregătire și orientare, nu ca înlocuitor pentru programa oficială, profesor sau materiale aprobate oficial.

## 9. Contact

Pentru probleme, sugestii sau raportarea unei erori, folosește secțiunea Issues din repository-ul GitHub al proiectului:

https://github.com/LaurAndreea10/BACapp/issues
