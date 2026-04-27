# Checklist final de lansare BAC Space

Folosește această listă înainte de prezentare, demo sau testare cu utilizatori reali.

## 1. Publicare și refresh

- [ ] GitHub Pages este actualizat după ultimul merge în `main`.
- [ ] Site-ul se deschide la `https://laurandreea10.github.io/BACapp/`.
- [ ] Ai făcut hard refresh după publicare.
- [ ] Service worker-ul nu servește o versiune veche.
- [ ] Nu apar erori critice în Console.

## 2. Primul contact cu aplicația

- [ ] Secțiunea **Alege traseul tău** apare clar.
- [ ] Cardurile **Română**, **Uman**, **Real / Științe** sunt vizibile.
- [ ] Butonul **Începe Română** duce la fluxul Română.
- [ ] Butonul **Începe Uman** duce la fluxul Istorie + Geografie.
- [ ] Butonul **Începe Real** duce la fluxul Matematică + Științe.

## 3. Fluxuri educaționale

### Română

- [ ] Planul de 7 zile se afișează.
- [ ] Lecțiile se afișează corect.
- [ ] Quiz-ul pornește și se poate finaliza.
- [ ] XP-ul se actualizează.
- [ ] Tabul **Progres** arată activitatea recentă.

### Istorie + Geografie

- [ ] Planul de 7 zile se afișează.
- [ ] Lecțiile de Istorie și Geografie se afișează corect.
- [ ] Quiz-ul se poate finaliza.
- [ ] Fișele rapide se afișează.
- [ ] XP-ul și activitatea recentă se actualizează.

### Matematică + Științe

- [ ] Planul de 7 zile se afișează.
- [ ] Lecțiile de Matematică, Biologie, Chimie și Fizică se afișează corect.
- [ ] Quiz-ul se poate finaliza.
- [ ] Fișele rapide se afișează.
- [ ] XP-ul și activitatea recentă se actualizează.

## 4. BAC Pack

- [ ] Lecțiile rapide se afișează.
- [ ] Simularea pe profil generează structură.
- [ ] Raportul după simulare se generează.
- [ ] Butonul **Reset progres** cere două confirmări.
- [ ] Resetarea nu se declanșează accidental.

## 5. AI Coach

- [ ] Sugestiile sunt grupate pe categorii.
- [ ] Întrebările sugerate produc răspunsuri presetate.
- [ ] Mesajele despre caracterul orientativ sunt clare.
- [ ] Nu apare cerință de API key.
- [ ] Nu apar erori CORS/API externe.

## 6. Confidențialitate și simulator

- [ ] Bannerul menționează că aplicația este simulator educațional.
- [ ] Linkul către `PRIVACY.md` se deschide.
- [ ] În README există mențiunea că aplicația nu este oficială.
- [ ] Politica explică salvarea locală a progresului.

## 7. Accesibilitate

- [ ] Butonul ♿ este vizibil.
- [ ] Contrast ridicat funcționează.
- [ ] Text mărit funcționează.
- [ ] Citire ușoară funcționează.
- [ ] Fără distrageri funcționează.
- [ ] Citește textul / Oprește funcționează.
- [ ] Navigarea cu `Tab`, `Enter`, `Space` este utilizabilă.

## 8. Mobil

- [ ] Cardurile nu se suprapun.
- [ ] Butonul ♿ nu acoperă elemente importante.
- [ ] Bannerul legal nu blochează navigarea.
- [ ] Butoanele sunt suficient de mari pentru atingere.
- [ ] Scroll-ul este clar și fluent.

## 9. PWA / offline

- [ ] Manifestul este disponibil.
- [ ] Service worker-ul se înregistrează.
- [ ] Pagina offline există.
- [ ] După refresh, fișierele noi sunt încărcate corect.

## 10. Capturi recomandate

Fă capturi pentru:

- [ ] Alege traseul tău
- [ ] Flux complet Română
- [ ] Flux complet Istorie + Geografie
- [ ] Flux complet Matematică + Științe
- [ ] BAC Pack
- [ ] AI Coach
- [ ] Panou de accesibilitate
- [ ] Banner simulator + privacy
