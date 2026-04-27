(() => {
  const KEY = 'bac-math-science-flow-v1';
  const DEFAULT = { xp: 0, lessons: {}, quizzes: {}, reviews: [], achievements: [] };

  const lessons = [
    {
      id: 'math-functions', subject: 'Matematică', title: 'Funcții și tabel de variație',
      text: 'La funcții, rezolvarea începe cu domeniul de definiție. Apoi calculezi derivata, studiezi semnul derivatei și construiești tabelul de variație. Concluzia trebuie să spună clar unde funcția crește, unde descrește și dacă are extreme.',
      steps: ['stabilește domeniul', 'calculează derivata', 'rezolvă f\'(x)=0', 'studiază semnul derivatei', 'completează tabelul de variație'],
      quiz: [
        { q: 'Care este primul pas la studiul unei funcții?', a: 'domeniul', o: ['domeniul', 'concluzia', 'desenul', 'nota finală'] },
        { q: 'Ce indică semnul derivatei?', a: 'monotonia funcției', o: ['culoarea graficului', 'monotonia funcției', 'numărul de pagini', 'unitatea de măsură'] },
        { q: 'Ce se trece în tabelul de variație?', a: 'semnul derivatei și variația funcției', o: ['autorul', 'semnul derivatei și variația funcției', 'doar enunțul', 'doar rezultatul numeric'] }
      ]
    },
    {
      id: 'math-integrals', subject: 'Matematică', title: 'Integrale și primitive',
      text: 'Pentru integrale, identifică tipul funcției și formula potrivită. La integrala definită folosești F(b)-F(a). O verificare bună este să derivezi rezultatul: dacă obții funcția inițială, primitiva este corectă.',
      steps: ['identifică tipul funcției', 'alege formula', 'calculează primitiva', 'aplică F(b)-F(a)', 'verifică prin derivare'],
      quiz: [
        { q: 'Cum verifici o primitivă?', a: 'prin derivare', o: ['prin derivare', 'prin desen liber', 'prin șters calculele', 'prin aproximare verbală'] },
        { q: 'La integrala definită se calculează:', a: 'F(b)-F(a)', o: ['F(a)-F(b)', 'F(b)-F(a)', 'a+b', 'doar derivata'] },
        { q: 'Ce trebuie identificat prima dată?', a: 'tipul funcției', o: ['tipul funcției', 'culoarea caietului', 'numărul exercițiului', 'nota'] }
      ]
    },
    {
      id: 'bio-genetics', subject: 'Biologie', title: 'Genetică: genotip și fenotip',
      text: 'În genetică, notează alelele, genotipurile părinților, gameții și combinațiile posibile. Separă raportul genotipic de raportul fenotipic. Nu calcula direct din memorie: tabelul te ajută să eviți combinații lipsă.',
      steps: ['notează alelele', 'scrie genotipurile părinților', 'determină gameții', 'completează combinațiile', 'separă raportul genotipic de cel fenotipic'],
      quiz: [
        { q: 'Ce reprezintă genotipul?', a: 'constituția genetică', o: ['aspectul exterior', 'constituția genetică', 'mediul de viață', 'vârsta'] },
        { q: 'Ce trebuie determinat înainte de combinații?', a: 'gameții', o: ['gameții', 'concluzia eseului', 'harta', 'titlul'] },
        { q: 'Ce raport trebuie separat de cel fenotipic?', a: 'raportul genotipic', o: ['raportul genotipic', 'raportul climatic', 'raportul geografic', 'raportul literar'] }
      ]
    },
    {
      id: 'bio-anatomy', subject: 'Biologie', title: 'Anatomie: structură și funcție',
      text: 'La anatomie, învață prin relația organ → structură → funcție. Pentru fiecare sistem, urmărește componentele principale, rolul lor și legătura cu alte sisteme. Schemele cu săgeți ajută mai mult decât recitirea pasivă.',
      steps: ['organ', 'structură', 'funcție', 'legături între sisteme', 'schemă recapitulativă'],
      quiz: [
        { q: 'Care este relația-cheie la anatomie?', a: 'structură și funcție', o: ['structură și funcție', 'rimă și ritm', 'preț și reducere', 'hartă și legendă'] },
        { q: 'Ce ajută la procese biologice?', a: 'schemele cu săgeți', o: ['schemele cu săgeți', 'memorarea fără sens', 'ignorarea termenilor', 'doar citirea titlului'] },
        { q: 'Ce trebuie legat între sisteme?', a: 'rolurile și conexiunile', o: ['rolurile și conexiunile', 'culorile manualului', 'numărul paginilor', 'numele capitolului'] }
      ]
    },
    {
      id: 'chem-stoich', subject: 'Chimie', title: 'Stoichiometrie',
      text: 'În stoichiometrie, începi mereu cu ecuația reacției echilibrată. Transformi datele în moli, folosești raportul molar din ecuație și revii la unitatea cerută. O ecuație neechilibrată strică tot calculul.',
      steps: ['echilibrează reacția', 'transformă datele în moli', 'folosește raportul molar', 'calculează', 'revino la unitatea cerută'],
      quiz: [
        { q: 'Primul pas în stoichiometrie este:', a: 'echilibrarea reacției', o: ['echilibrarea reacției', 'scrierea concluziei', 'desenul graficului', 'alegerea culorii'] },
        { q: 'Raportul molar se ia din:', a: 'ecuația chimică', o: ['ecuația chimică', 'calendar', 'hartă', 'eseu'] },
        { q: 'Datele se transformă frecvent în:', a: 'moli', o: ['moli', 'versuri', 'capitale', 'ani istorici'] }
      ]
    },
    {
      id: 'chem-ph', subject: 'Chimie', title: 'pH, acizi și baze',
      text: 'Pentru pH, identifică dacă soluția este acidă sau bazică, notează concentrația relevantă și aplică formula potrivită. Interpretează rezultatul: pH sub 7 este acid, pH egal cu 7 este neutru, iar pH peste 7 este bazic.',
      steps: ['identifică acid/bază', 'notează concentrația', 'aplică formula', 'calculează pH/pOH', 'interpretează rezultatul'],
      quiz: [
        { q: 'pH < 7 indică o soluție:', a: 'acidă', o: ['acidă', 'bazică', 'neutră mereu', 'solidă'] },
        { q: 'pH = 7 indică:', a: 'soluție neutră', o: ['soluție neutră', 'acid foarte tare', 'bază foarte tare', 'metal'] },
        { q: 'La pH trebuie atenție la:', a: 'puteri ale lui 10 și logaritmi', o: ['puteri ale lui 10 și logaritmi', 'figuri de stil', 'cronologie', 'hartă'] }
      ]
    },
    {
      id: 'phys-mechanics', subject: 'Fizică', title: 'Mecanică: mișcare și forță',
      text: 'La mecanică, scrie datele și transformă unitățile în SI. Alege relația potrivită: v=d/t, a=Δv/t, F=m·a sau L=F·d. Dacă există direcții sau forțe, fă o schemă simplă înainte de calcule.',
      steps: ['date și unități SI', 'schemă', 'formula potrivită', 'înlocuire numerică', 'verificarea unității'],
      quiz: [
        { q: 'Ce trebuie făcut cu unitățile?', a: 'transformate în SI', o: ['transformate în SI', 'ignorate', 'scrise la final doar', 'înlocuite cu texte'] },
        { q: 'Legea a II-a se scrie simplificat:', a: 'F=m·a', o: ['F=m·a', 'pH=7', 'F(b)-F(a)', 'A=T+V'] },
        { q: 'În probleme cu forțe ajută:', a: 'schema', o: ['schema', 'rezumatul literar', 'glosarul istoric', 'titlul poeziei'] }
      ]
    },
    {
      id: 'phys-electricity', subject: 'Fizică', title: 'Electricitate: legea lui Ohm',
      text: 'Pentru circuite electrice, notează tensiunea, intensitatea și rezistența. Legea lui Ohm este U=R·I. La rezistențe, în serie se adună direct, iar în paralel se folosește suma inverselor.',
      steps: ['notează U, R, I', 'transformă unitățile', 'aplică U=R·I', 'serie: rezistențele se adună', 'paralel: se adună inversele'],
      quiz: [
        { q: 'Legea lui Ohm este:', a: 'U=R·I', o: ['U=R·I', 'F=m·a', 'pH=-log', 'v=d/t doar'] },
        { q: 'Rezistențele în serie:', a: 'se adună', o: ['se adună', 'se ignoră', 'se scad mereu', 'devin zero'] },
        { q: 'Ce mărimi apar în legea lui Ohm?', a: 'tensiune, rezistență, intensitate', o: ['tensiune, rezistență, intensitate', 'temă, motiv, simbol', 'relief, climă, populație', 'autor, operă, curent'] }
      ]
    }
  ];

  const flashcards = [
    ['Derivata', 'Instrument pentru studiul monotoniei și al extremelor.'],
    ['Primitiva', 'Funcție a cărei derivată este funcția inițială.'],
    ['Genotip', 'Constituția genetică a unui organism.'],
    ['Fenotip', 'Totalitatea trăsăturilor observabile.'],
    ['Mol', 'Unitate pentru cantitatea de substanță.'],
    ['pH', 'Măsură a acidității sau bazicității.'],
    ['Forță', 'Interacțiune care poate modifica starea de mișcare.'],
    ['Rezistență electrică', 'Mărime care se opune trecerii curentului electric.']
  ];

  function load() { try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...DEFAULT }; } }
  function save(state) { localStorage.setItem(KEY, JSON.stringify(state)); }
  function addXP(amount, reason) {
    const state = load();
    state.xp = (state.xp || 0) + amount;
    state.reviews = state.reviews || [];
    state.reviews.unshift({ date: new Date().toISOString(), reason, amount });
    state.reviews = state.reviews.slice(0, 12);
    if (state.xp >= 100 && !state.achievements.includes('Real 100 XP')) state.achievements.push('Real 100 XP');
    save(state);
    render('progress');
  }
  function mount() {
    if (document.getElementById('ms-flow')) return;
    const root = document.querySelector('.mn') || document.querySelector('main') || document.body;
    const el = document.createElement('section');
    el.id = 'ms-flow';
    el.className = 'ms-flow';
    el.innerHTML = `
      <div class="ms-flow-head"><div><div class="ms-flow-title">🔬 Flux complet Matematică + Științe</div><div class="ms-flow-sub">Plan 7 zile, lecții reale, quiz, XP și progres local pentru profil real/științe.</div></div><div class="ms-flow-badge">Real / Științe</div></div>
      <div class="ms-note"><strong>Metodă:</strong> rezolvi pe pași, verifici unitățile/formulele și primești XP local pentru acțiuni reale.</div>
      <div class="ms-flow-tabs" role="tablist"><button class="ms-flow-tab" data-tab="plan" aria-selected="true">Plan 7 zile</button><button class="ms-flow-tab" data-tab="lessons" aria-selected="false">Lecții</button><button class="ms-flow-tab" data-tab="quiz" aria-selected="false">Quiz</button><button class="ms-flow-tab" data-tab="flashcards" aria-selected="false">Fișe rapide</button><button class="ms-flow-tab" data-tab="progress" aria-selected="false">Progres</button></div>
      <div class="ms-flow-body"></div>`;
    const anchor = document.getElementById('hg-flow') || document.getElementById('ro-flow') || document.getElementById('bac-education-pack') || root.querySelector('.pn.act') || root.firstElementChild;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(el, anchor.nextSibling); else root.prepend(el);
    el.querySelectorAll('.ms-flow-tab').forEach(b => b.addEventListener('click', () => render(b.dataset.tab)));
    render('plan');
  }
  function select(tab) { document.querySelectorAll('.ms-flow-tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab))); return document.querySelector('#ms-flow .ms-flow-body'); }
  function render(tab) {
    const body = select(tab); if (!body) return;
    const state = load();
    if (tab === 'plan') body.innerHTML = `<div class="ms-grid"><article class="ms-card"><h4>Plan 7 zile</h4><ul><li>Ziua 1: Funcții și derivate</li><li>Ziua 2: Integrale</li><li>Ziua 3: Genetică</li><li>Ziua 4: Anatomie</li><li>Ziua 5: Stoichiometrie + pH</li><li>Ziua 6: Mecanică + electricitate</li><li>Ziua 7: recapitulare mixtă real/științe</li></ul><div class="ms-actions"><button class="ms-btn primary" id="ms-start">Începe cu lecțiile</button></div></article><article class="ms-card"><h4>Strategie</h4><p>La real, punctele vin din pași clari: date, formulă, calcul, verificare. Nu sări peste condiții, unități sau interpretare.</p></article></div>`;
    if (tab === 'lessons') body.innerHTML = `<div class="ms-grid">${lessons.map(l => `<article class="ms-card"><h4>${l.subject}: ${l.title}</h4><p>${l.text}</p><ul>${l.steps.map(s => `<li>${s}</li>`).join('')}</ul><div class="ms-actions"><button class="ms-btn primary" data-done="${l.id}">Marchează lecția parcursă +20 XP</button></div></article>`).join('')}</div>`;
    if (tab === 'quiz') body.innerHTML = `<div class="ms-card"><h4>Quiz Matematică + Științe</h4><label>Alege lecția: <select id="ms-quiz-select">${lessons.map(l => `<option value="${l.id}">${l.subject}: ${l.title}</option>`).join('')}</select></label><div id="ms-quiz-box" class="ms-output"></div></div>`;
    if (tab === 'flashcards') body.innerHTML = `<div class="ms-grid">${flashcards.map(f => `<article class="ms-card"><h4>${f[0]}</h4><p>${f[1]}</p></article>`).join('')}</div><div class="ms-actions"><button class="ms-btn primary" id="ms-flashcards-done">Am recapitulat fișele +15 XP</button></div>`;
    if (tab === 'progress') body.innerHTML = `<div class="ms-progress"><div><strong>${state.xp || 0}</strong>XP Real</div><div><strong>${Object.keys(state.lessons || {}).length}</strong>Lecții</div><div><strong>${Object.keys(state.quizzes || {}).length}</strong>Quiz-uri</div><div><strong>${(state.achievements || []).length}</strong>Achievements</div></div><div class="ms-card"><h4>Activitate recentă</h4><ul>${(state.reviews || []).slice(0,6).map(r => `<li>${r.reason} (+${r.amount} XP)</li>`).join('') || '<li>Nicio activitate încă.</li>'}</ul></div>`;
    wire(tab);
  }
  function wire(tab) {
    document.getElementById('ms-start')?.addEventListener('click', () => render('lessons'));
    document.querySelectorAll('[data-done]').forEach(btn => btn.addEventListener('click', () => { const s = load(); s.lessons[btn.dataset.done] = true; save(s); addXP(20, 'Lecție Matematică/Științe parcursă'); btn.textContent = 'Lecție salvată ✓'; }));
    document.getElementById('ms-flashcards-done')?.addEventListener('click', () => addXP(15, 'Fișe Matematică/Științe recapitulate'));
    const selectEl = document.getElementById('ms-quiz-select');
    if (selectEl) { const draw = () => drawQuiz(selectEl.value); selectEl.addEventListener('change', draw); draw(); }
  }
  function drawQuiz(id) {
    const lesson = lessons.find(l => l.id === id); const box = document.getElementById('ms-quiz-box'); if (!lesson || !box) return;
    let idx = 0, correct = 0;
    const ask = () => {
      const q = lesson.quiz[idx];
      if (!q) { const s = load(); s.quizzes[id] = { correct, total: lesson.quiz.length, date: new Date().toISOString() }; save(s); addXP(10 + correct * 5, `Quiz ${lesson.title}: ${correct}/${lesson.quiz.length}`); box.textContent = `Quiz finalizat: ${correct}/${lesson.quiz.length}. XP acordat și progres actualizat.`; return; }
      box.innerHTML = `<strong>${idx + 1}. ${q.q}</strong><div>${q.o.map(o => `<button class="ms-btn ms-quiz-option" data-answer="${o}">${o}</button>`).join('')}</div>`;
      box.querySelectorAll('[data-answer]').forEach(b => b.addEventListener('click', () => { if (b.dataset.answer === q.a) correct++; idx++; ask(); }));
    };
    ask();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  setTimeout(mount, 1000);
})();
