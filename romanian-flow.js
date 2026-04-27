(() => {
  const KEY = 'bac-romanian-flow-v1';
  const DEFAULT = { xp: 0, streak: 0, lessons: {}, quizzes: {}, reviews: [], achievements: [] };

  const lessons = [
    {
      id: 'eseu-roman',
      title: 'Structura eseului la roman',
      level: 'Începător',
      text: 'Un eseu bun la roman nu este un rezumat. El demonstrează o idee despre operă, folosind scene și concepte literare. Începe cu autorul, opera și încadrarea. Continuă cu tema și două episoade relevante. Apoi explică două elemente de construcție: conflictul, perspectiva narativă, titlul, personajele sau limbajul. Încheie printr-o concluzie care reia ideea principală.',
      steps: ['Autor + operă + curent/specie', 'Tema formulată clar', 'Două scene relevante', 'Două elemente de construcție', 'Concluzie scurtă'],
      quiz: [
        { q: 'Ce trebuie evitat într-un eseu la roman?', a: 'rezumatul operei', o: ['rezumatul operei', 'menționarea autorului', 'o concluzie', 'două scene'] },
        { q: 'Ce rol au scenele relevante?', a: 'demonstrează tema sau trăsăturile', o: ['umplu pagina', 'demonstrează tema sau trăsăturile', 'înlocuiesc concluzia', 'nu contează'] },
        { q: 'Care este o pereche corectă de elemente de construcție?', a: 'conflict și perspectivă narativă', o: ['copertă și editură', 'conflict și perspectivă narativă', 'număr de pagini și capitole', 'autor și cititor'] }
      ]
    },
    {
      id: 'poezie-modernism',
      title: 'Comentarea poeziei moderniste',
      level: 'Mediu',
      text: 'La poezie, punctajul vine din interpretare, nu din enumerare. Încadrează textul într-un curent, identifică tema și explică imaginile poetice. Figurile de stil trebuie legate de efectul lor: ce sugerează, ce atmosferă creează, ce idee susțin. Pentru modernism, urmărește ambiguitatea, metafora, intelectualizarea emoției și limbajul concentrat.',
      steps: ['Curent literar', 'Tema poeziei', 'Două imagini poetice', 'Figuri de stil + efect', 'Concluzie interpretativă'],
      quiz: [
        { q: 'Ce contează cel mai mult la comentarea poeziei?', a: 'interpretarea efectului', o: ['memorarea mecanică', 'interpretarea efectului', 'numărul de strofe', 'biografia autorului'] },
        { q: 'Ce trebuie să explici la o metaforă?', a: 'ce sugerează în text', o: ['doar definiția', 'ce sugerează în text', 'pagina unde apare', 'rima'] },
        { q: 'Ce trăsătură se potrivește frecvent modernismului?', a: 'ambiguitatea limbajului', o: ['limbaj strict popular', 'ambiguitatea limbajului', 'lipsa metaforelor', 'narațiune obiectivă'] }
      ]
    },
    {
      id: 'argumentativ',
      title: 'Textul argumentativ la Subiectul I',
      level: 'Începător',
      text: 'Textul argumentativ cere o opinie clară și două argumente susținute. Începe prin a formula poziția ta. Fiecare argument trebuie explicat și, ideal, susținut printr-un exemplu. Folosește conectori logici: în primul rând, în al doilea rând, de exemplu, prin urmare. Concluzia reia ideea, fără informații noi.',
      steps: ['Opinie clară', 'Argument 1 + explicație', 'Argument 2 + exemplu', 'Conectori logici', 'Concluzie'],
      quiz: [
        { q: 'Câte argumente sunt recomandate într-un text argumentativ scurt?', a: 'două', o: ['zero', 'unul', 'două', 'zece'] },
        { q: 'Ce trebuie să facă o concluzie?', a: 'să reia ideea principală', o: ['să adauge alt subiect', 'să reia ideea principală', 'să contrazică opinia', 'să fie un citat lung'] },
        { q: 'Care este un conector potrivit?', a: 'în primul rând', o: ['personajul principal', 'în primul rând', 'rimă împerecheată', 'narator obiectiv'] }
      ]
    }
  ];

  const essays = [
    'Roman realist: introducere → încadrare → temă → scene → conflict/perspectivă/personaj → concluzie.',
    'Poezie modernistă: curent → temă → imagini poetice → figuri de stil → limbaj → concluzie interpretativă.'
  ];

  const flashcards = [
    ['Tema', 'Ideea centrală a textului literar.'],
    ['Conflict', 'Opoziția dintre personaje, idei sau valori.'],
    ['Perspectivă narativă', 'Poziția din care sunt relatate evenimentele.'],
    ['Caracterizare indirectă', 'Trăsături deduse din fapte, limbaj, relații sau gesturi.'],
    ['Modernism', 'Curent orientat spre inovație, ambiguitate și expresie concentrată.']
  ];

  const glossary = [
    ['incipit', 'începutul unei opere literare'],
    ['final', 'secvența de încheiere a operei'],
    ['motiv literar', 'element repetat cu valoare simbolică'],
    ['lirism', 'exprimarea directă sau mediată a emoției'],
    ['narator omniscient', 'narator care știe mai mult decât personajele'],
    ['realism', 'curent care urmărește reprezentarea verosimilă a realității'],
    ['simbol', 'semn concret cu sens abstract'],
    ['antiteză', 'opoziție între două idei sau imagini'],
    ['epitet', 'determinant expresiv'],
    ['metaforă', 'transfer de sens între doi termeni']
  ];

  function load() { try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...DEFAULT }; } }
  function save(state) { localStorage.setItem(KEY, JSON.stringify(state)); }
  function addXP(amount, reason) {
    const state = load();
    state.xp = (state.xp || 0) + amount;
    state.streak = Math.max(1, state.streak || 0);
    state.reviews = state.reviews || [];
    state.reviews.unshift({ date: new Date().toISOString(), reason, amount });
    state.reviews = state.reviews.slice(0, 12);
    if (state.xp >= 100 && !state.achievements.includes('Primii 100 XP')) state.achievements.push('Primii 100 XP');
    save(state);
    render('progress');
  }

  function mount() {
    if (document.getElementById('ro-flow')) return;
    const root = document.querySelector('.mn') || document.querySelector('main') || document.body;
    const el = document.createElement('section');
    el.id = 'ro-flow';
    el.className = 'ro-flow';
    el.innerHTML = `
      <div class="ro-flow-head"><div><div class="ro-flow-title">🇷🇴 Flux complet Română</div><div class="ro-flow-sub">Alege materia → parcurge lecția → fă quiz → primește XP → vezi recapitulări și progres real.</div></div><div class="ro-flow-badge">Experiență cap-coadă</div></div>
      <div class="ro-ai-note"><strong>Clarificare AI:</strong> generatorul, AI Coach și orice corectare pe barem oferă rezultate orientative. Nu înlocuiesc baremul oficial sau evaluarea profesorului.</div>
      <div class="ro-flow-tabs" role="tablist"><button class="ro-flow-tab" data-tab="onboarding" aria-selected="true">Start 7 zile</button><button class="ro-flow-tab" data-tab="lessons" aria-selected="false">Lecții</button><button class="ro-flow-tab" data-tab="quiz" aria-selected="false">Quiz</button><button class="ro-flow-tab" data-tab="essays" aria-selected="false">Eseuri/fișe/glosar</button><button class="ro-flow-tab" data-tab="progress" aria-selected="false">Progres</button></div>
      <div class="ro-flow-body"></div>`;
    const anchor = document.getElementById('bac-education-pack') || root.querySelector('.pn.act') || root.firstElementChild;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(el, anchor.nextSibling); else root.prepend(el);
    el.querySelectorAll('.ro-flow-tab').forEach(b => b.addEventListener('click', () => render(b.dataset.tab)));
    render('onboarding');
  }

  function select(tab) { document.querySelectorAll('.ro-flow-tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab))); return document.querySelector('#ro-flow .ro-flow-body'); }

  function render(tab) {
    const body = select(tab); if (!body) return;
    const state = load();
    if (tab === 'onboarding') body.innerHTML = `<div class="ro-grid"><article class="ro-card"><h4>Plan de 7 zile</h4><ul><li>Ziua 1: Structura eseului la roman</li><li>Ziua 2: Quiz + refacere greșeli</li><li>Ziua 3: Poezie modernistă</li><li>Ziua 4: Text argumentativ</li><li>Ziua 5: Fișe rapide + glosar</li><li>Ziua 6: mini-simulare</li><li>Ziua 7: recapitulare 1-3-7</li></ul><div class="ro-actions"><button class="ro-btn primary" id="ro-start">Începe cu prima lecție</button></div></article><article class="ro-card"><h4>De ce acest flux?</h4><p>Acest traseu demonstrează funcțional experiența de învățare: conținut real, quiz, XP, recapitulare și progres local.</p></article></div>`;
    if (tab === 'lessons') body.innerHTML = `<div class="ro-grid">${lessons.map(l => `<article class="ro-card"><h4>${l.title}</h4><p><strong>Nivel:</strong> ${l.level}</p><p>${l.text}</p><ul>${l.steps.map(s => `<li>${s}</li>`).join('')}</ul><div class="ro-actions"><button class="ro-btn primary" data-done="${l.id}">Marchează lecția parcursă +20 XP</button></div></article>`).join('')}</div>`;
    if (tab === 'quiz') body.innerHTML = `<div class="ro-card"><h4>Quiz Română</h4><label>Alege lecția: <select id="ro-quiz-select">${lessons.map(l => `<option value="${l.id}">${l.title}</option>`).join('')}</select></label><div id="ro-quiz-box" class="ro-output"></div></div>`;
    if (tab === 'essays') body.innerHTML = `<div class="ro-grid"><article class="ro-card"><h4>Modele eseu</h4><ul>${essays.map(e => `<li>${e}</li>`).join('')}</ul></article><article class="ro-card"><h4>Fișe rapide</h4><ul>${flashcards.map(f => `<li><strong>${f[0]}:</strong> ${f[1]}</li>`).join('')}</ul></article><article class="ro-card"><h4>Glosar</h4><ul>${glossary.map(g => `<li><strong>${g[0]}:</strong> ${g[1]}</li>`).join('')}</ul></article></div><div class="ro-actions"><button class="ro-btn primary" id="ro-flashcards-done">Am recapitulat fișele +15 XP</button></div>`;
    if (tab === 'progress') body.innerHTML = `<div class="ro-progress"><div><strong>${state.xp || 0}</strong>XP Română</div><div><strong>${Object.keys(state.lessons || {}).length}</strong>Lecții</div><div><strong>${Object.keys(state.quizzes || {}).length}</strong>Quiz-uri</div><div><strong>${(state.achievements || []).length}</strong>Achievements</div></div><div class="ro-card"><h4>Recapitulări recente</h4><ul>${(state.reviews || []).slice(0,6).map(r => `<li>${r.reason} (+${r.amount} XP)</li>`).join('') || '<li>Nicio activitate încă.</li>'}</ul></div>`;
    wire(tab);
  }

  function wire(tab) {
    if (tab === 'onboarding') document.getElementById('ro-start')?.addEventListener('click', () => render('lessons'));
    document.querySelectorAll('[data-done]').forEach(btn => btn.addEventListener('click', () => { const s = load(); s.lessons[btn.dataset.done] = true; save(s); addXP(20, 'Lecție Română parcursă'); btn.textContent = 'Lecție salvată ✓'; }));
    document.getElementById('ro-flashcards-done')?.addEventListener('click', () => addXP(15, 'Fișe rapide recapitulate'));
    const selectEl = document.getElementById('ro-quiz-select');
    if (selectEl) { const draw = () => drawQuiz(selectEl.value); selectEl.addEventListener('change', draw); draw(); }
  }

  function drawQuiz(id) {
    const lesson = lessons.find(l => l.id === id); const box = document.getElementById('ro-quiz-box'); if (!lesson || !box) return;
    let idx = 0, correct = 0;
    const ask = () => {
      const q = lesson.quiz[idx];
      if (!q) { const s = load(); s.quizzes[id] = { correct, total: lesson.quiz.length, date: new Date().toISOString() }; save(s); addXP(10 + correct * 5, `Quiz ${lesson.title}: ${correct}/${lesson.quiz.length}`); box.textContent = `Quiz finalizat: ${correct}/${lesson.quiz.length}. XP acordat și progres actualizat.`; return; }
      box.innerHTML = `<strong>${idx + 1}. ${q.q}</strong><div>${q.o.map(o => `<button class="ro-btn ro-quiz-option" data-answer="${o}">${o}</button>`).join('')}</div>`;
      box.querySelectorAll('[data-answer]').forEach(b => b.addEventListener('click', () => { if (b.dataset.answer === q.a) correct++; idx++; ask(); }));
    };
    ask();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  setTimeout(mount, 800);
})();
