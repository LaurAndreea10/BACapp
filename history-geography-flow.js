(() => {
  const KEY = 'bac-history-geography-flow-v1';
  const DEFAULT = { xp: 0, lessons: {}, quizzes: {}, reviews: [], achievements: [] };

  const lessons = [
    {
      id: 'hist-constitutii',
      subject: 'Istorie',
      title: 'Constituțiile României',
      text: 'Constituțiile sunt repere esențiale pentru înțelegerea evoluției statului român. Constituția din 1866 consolidează monarhia constituțională și principiul separării puterilor. Constituția din 1923 reflectă România Mare și extinde participarea politică. Constituția din 1938 marchează autoritarismul regal. Constituția din 1991 revine la democrație, pluralism și drepturi fundamentale.',
      steps: ['1866: monarhie constituțională', '1923: România Mare', '1938: autoritarism regal', '1991: democrație postcomunistă'],
      quiz: [
        { q: 'Ce constituție este asociată României Mari?', a: '1923', o: ['1866', '1923', '1938', '1991'] },
        { q: 'Ce marchează Constituția din 1938?', a: 'autoritarism regal', o: ['democrație liberală', 'autoritarism regal', 'comunism', 'unirea principatelor'] },
        { q: 'Ce principiu apare în constituțiile democratice?', a: 'separarea puterilor', o: ['partid unic', 'cenzură totală', 'separarea puterilor', 'dictatură militară'] }
      ]
    },
    {
      id: 'hist-comunism',
      subject: 'Istorie',
      title: 'Regimul comunist în România',
      text: 'Regimul comunist s-a instaurat treptat după 1945, prin presiune sovietică, control politic și eliminarea opoziției. A urmat naționalizarea, colectivizarea și represiunea. Statul controla economia, presa, educația și viața publică. În 1989, regimul comunist s-a prăbușit în contextul crizei interne și al schimbărilor din Europa de Est.',
      steps: ['instaurare după 1945', 'naționalizare și colectivizare', 'represiune politică', 'prăbușire în 1989'],
      quiz: [
        { q: 'Ce înseamnă naționalizarea?', a: 'trecerea proprietății în mâna statului', o: ['alegeri libere', 'trecerea proprietății în mâna statului', 'privatizare', 'autonomie locală'] },
        { q: 'Ce an marchează căderea comunismului în România?', a: '1989', o: ['1918', '1947', '1965', '1989'] },
        { q: 'Care este o trăsătură a totalitarismului?', a: 'control politic asupra societății', o: ['pluralism politic', 'control politic asupra societății', 'separarea puterilor', 'presă liberă'] }
      ]
    },
    {
      id: 'hist-romanitate',
      subject: 'Istorie',
      title: 'Romanitatea românilor',
      text: 'Romanitatea românilor se referă la originea latină a poporului român și a limbii române. Tema este susținută prin argumente istorice, lingvistice și arheologice. În eseu, este important să explici continuitatea daco-romană, formarea poporului român și folosirea ideii de romanitate în epoca modernă.',
      steps: ['origine latină', 'argumente lingvistice', 'continuitate daco-romană', 'rol identitar în epoca modernă'],
      quiz: [
        { q: 'Ce exprimă romanitatea românilor?', a: 'originea latină', o: ['originea slavă exclusivă', 'originea latină', 'izolarea culturală', 'lipsa continuității'] },
        { q: 'Ce tip de argument poate susține romanitatea?', a: 'lingvistic', o: ['meteorologic', 'lingvistic', 'sportiv', 'comercial'] },
        { q: 'De ce este importantă romanitatea în epoca modernă?', a: 'susține identitatea națională', o: ['elimină limba română', 'susține identitatea națională', 'anulează istoria', 'nu are rol'] }
      ]
    },
    {
      id: 'geo-relief',
      subject: 'Geografie',
      title: 'Unitățile de relief ale României',
      text: 'Relieful României este variat și dispus aproape concentric: Carpații, Subcarpații, podișurile, câmpiile și Delta Dunării. La BAC, contează localizarea, caracteristicile și exemplele. Pentru fiecare unitate, reține poziția, altitudinea, resursele și legătura cu așezările sau economia.',
      steps: ['Carpați', 'Subcarpați', 'podișuri', 'câmpii', 'Delta Dunării'],
      quiz: [
        { q: 'Ce unitate are altitudini mari?', a: 'Carpații', o: ['Câmpia Română', 'Carpații', 'Delta Dunării', 'Lunca Dunării'] },
        { q: 'Ce trebuie verificat prima dată pe hartă?', a: 'legenda și orientarea', o: ['culoarea manualului', 'legenda și orientarea', 'numărul paginii', 'autorul'] },
        { q: 'Delta Dunării este importantă pentru:', a: 'biodiversitate', o: ['industrie grea montană', 'biodiversitate', 'zăcăminte de cărbune', 'altitudine mare'] }
      ]
    },
    {
      id: 'geo-clima',
      subject: 'Geografie',
      title: 'Clima României și factorii climatici',
      text: 'Clima României este temperat-continentală, cu diferențe regionale. Factorii principali sunt latitudinea, altitudinea, poziția față de ocean, influențele continentale și relieful. Temperatura scade cu altitudinea, iar precipitațiile cresc în zonele montane.',
      steps: ['latitudine', 'altitudine', 'influențe oceanice/continentale', 'relief', 'precipitații'],
      quiz: [
        { q: 'Cum se schimbă temperatura cu altitudinea?', a: 'scade', o: ['crește mereu', 'scade', 'nu se schimbă', 'devine tropicală'] },
        { q: 'Ce tip general de climă are România?', a: 'temperat-continentală', o: ['ecuatorială', 'temperat-continentală', 'polară', 'musonică'] },
        { q: 'Unde sunt de obicei precipitații mai bogate?', a: 'în zona montană', o: ['în zona montană', 'doar în câmpie', 'doar în deșert', 'nicăieri'] }
      ]
    },
    {
      id: 'geo-europa',
      subject: 'Geografie',
      title: 'Europa: state, regiuni și economie',
      text: 'Europa poate fi învățată mai ușor pe regiuni: Vest, Nord, Sud, Est și Central. Pentru fiecare regiune, reține exemple de state, caracteristici naturale și trăsături economice. Leagă poziția geografică de climă, populație, transporturi și activități economice.',
      steps: ['regiuni europene', 'state și capitale', 'climă', 'populație', 'economie'],
      quiz: [
        { q: 'Cum este mai eficient să înveți Europa?', a: 'pe regiuni', o: ['alfabetic fără hartă', 'pe regiuni', 'doar după steaguri', 'la întâmplare'] },
        { q: 'Ce influențează clima Europei de Vest?', a: 'Oceanul Atlantic', o: ['Oceanul Atlantic', 'deșertul Sahara exclusiv', 'Polul Sud', 'Anzii'] },
        { q: 'Ce trebuie legat în răspunsurile de geografie?', a: 'poziție, climă, populație și economie', o: ['doar capitale', 'poziție, climă, populație și economie', 'doar nume de râuri', 'doar culori'] }
      ]
    }
  ];

  const flashcards = [
    ['Separarea puterilor', 'Principiu democratic: legislativă, executivă, judecătorească.'],
    ['Totalitarism', 'Regim politic cu partid unic și control asupra societății.'],
    ['Naționalizare', 'Trecerea proprietății private în proprietatea statului.'],
    ['Relief concentric', 'Dispunerea treptelor de relief în jurul Carpaților.'],
    ['Climă temperat-continentală', 'Climă cu patru anotimpuri și diferențe termice sezoniere.'],
    ['Regiune geografică', 'Spațiu cu trăsături naturale și socio-economice comune.']
  ];

  function load() { try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...DEFAULT }; } }
  function save(state) { localStorage.setItem(KEY, JSON.stringify(state)); }
  function addXP(amount, reason) {
    const state = load();
    state.xp = (state.xp || 0) + amount;
    state.reviews = state.reviews || [];
    state.reviews.unshift({ date: new Date().toISOString(), reason, amount });
    state.reviews = state.reviews.slice(0, 12);
    if (state.xp >= 100 && !state.achievements.includes('Uman 100 XP')) state.achievements.push('Uman 100 XP');
    save(state);
    render('progress');
  }
  function mount() {
    if (document.getElementById('hg-flow')) return;
    const root = document.querySelector('.mn') || document.querySelector('main') || document.body;
    const el = document.createElement('section');
    el.id = 'hg-flow';
    el.className = 'hg-flow';
    el.innerHTML = `
      <div class="hg-flow-head"><div><div class="hg-flow-title">🏛️ Flux complet Istorie + Geografie</div><div class="hg-flow-sub">Lecții reale, quiz, XP, recapitulări și progres local pentru profil uman.</div></div><div class="hg-flow-badge">Uman / BAC</div></div>
      <div class="hg-note"><strong>Flux cap-coadă:</strong> parcurgi lecția, faci quiz, primești XP și vezi progresul local. Conținutul este orientativ pentru pregătire și trebuie completat cu programa oficială.</div>
      <div class="hg-flow-tabs" role="tablist"><button class="hg-flow-tab" data-tab="plan" aria-selected="true">Plan 7 zile</button><button class="hg-flow-tab" data-tab="lessons" aria-selected="false">Lecții</button><button class="hg-flow-tab" data-tab="quiz" aria-selected="false">Quiz</button><button class="hg-flow-tab" data-tab="flashcards" aria-selected="false">Fișe rapide</button><button class="hg-flow-tab" data-tab="progress" aria-selected="false">Progres</button></div>
      <div class="hg-flow-body"></div>`;
    const anchor = document.getElementById('ro-flow') || document.getElementById('bac-education-pack') || root.querySelector('.pn.act') || root.firstElementChild;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(el, anchor.nextSibling); else root.prepend(el);
    el.querySelectorAll('.hg-flow-tab').forEach(b => b.addEventListener('click', () => render(b.dataset.tab)));
    render('plan');
  }
  function select(tab) { document.querySelectorAll('.hg-flow-tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab))); return document.querySelector('#hg-flow .hg-flow-body'); }
  function render(tab) {
    const body = select(tab); if (!body) return;
    const state = load();
    if (tab === 'plan') body.innerHTML = `<div class="hg-grid"><article class="hg-card"><h4>Plan 7 zile</h4><ul><li>Ziua 1: Constituțiile României</li><li>Ziua 2: Quiz istorie + cronologie</li><li>Ziua 3: Comunismul în România</li><li>Ziua 4: Romanitatea românilor</li><li>Ziua 5: Relieful României</li><li>Ziua 6: Climă + Europa</li><li>Ziua 7: recapitulare mixtă istorie-geografie</li></ul><div class="hg-actions"><button class="hg-btn primary" id="hg-start">Începe cu lecțiile</button></div></article><article class="hg-card"><h4>Strategie</h4><p>La istorie urmărești cronologia și cauză → fapt → consecință. La geografie urmărești poziție → caracteristică → explicație → exemplu.</p></article></div>`;
    if (tab === 'lessons') body.innerHTML = `<div class="hg-grid">${lessons.map(l => `<article class="hg-card"><h4>${l.subject}: ${l.title}</h4><p>${l.text}</p><ul>${l.steps.map(s => `<li>${s}</li>`).join('')}</ul><div class="hg-actions"><button class="hg-btn primary" data-done="${l.id}">Marchează lecția parcursă +20 XP</button></div></article>`).join('')}</div>`;
    if (tab === 'quiz') body.innerHTML = `<div class="hg-card"><h4>Quiz Istorie + Geografie</h4><label>Alege lecția: <select id="hg-quiz-select">${lessons.map(l => `<option value="${l.id}">${l.subject}: ${l.title}</option>`).join('')}</select></label><div id="hg-quiz-box" class="hg-output"></div></div>`;
    if (tab === 'flashcards') body.innerHTML = `<div class="hg-grid">${flashcards.map(f => `<article class="hg-card"><h4>${f[0]}</h4><p>${f[1]}</p></article>`).join('')}</div><div class="hg-actions"><button class="hg-btn primary" id="hg-flashcards-done">Am recapitulat fișele +15 XP</button></div>`;
    if (tab === 'progress') body.innerHTML = `<div class="hg-progress"><div><strong>${state.xp || 0}</strong>XP Uman</div><div><strong>${Object.keys(state.lessons || {}).length}</strong>Lecții</div><div><strong>${Object.keys(state.quizzes || {}).length}</strong>Quiz-uri</div><div><strong>${(state.achievements || []).length}</strong>Achievements</div></div><div class="hg-card"><h4>Activitate recentă</h4><ul>${(state.reviews || []).slice(0,6).map(r => `<li>${r.reason} (+${r.amount} XP)</li>`).join('') || '<li>Nicio activitate încă.</li>'}</ul></div>`;
    wire(tab);
  }
  function wire(tab) {
    document.getElementById('hg-start')?.addEventListener('click', () => render('lessons'));
    document.querySelectorAll('[data-done]').forEach(btn => btn.addEventListener('click', () => { const s = load(); s.lessons[btn.dataset.done] = true; save(s); addXP(20, 'Lecție Istorie/Geografie parcursă'); btn.textContent = 'Lecție salvată ✓'; }));
    document.getElementById('hg-flashcards-done')?.addEventListener('click', () => addXP(15, 'Fișe Istorie/Geografie recapitulate'));
    const selectEl = document.getElementById('hg-quiz-select');
    if (selectEl) { const draw = () => drawQuiz(selectEl.value); selectEl.addEventListener('change', draw); draw(); }
  }
  function drawQuiz(id) {
    const lesson = lessons.find(l => l.id === id); const box = document.getElementById('hg-quiz-box'); if (!lesson || !box) return;
    let idx = 0, correct = 0;
    const ask = () => {
      const q = lesson.quiz[idx];
      if (!q) { const s = load(); s.quizzes[id] = { correct, total: lesson.quiz.length, date: new Date().toISOString() }; save(s); addXP(10 + correct * 5, `Quiz ${lesson.title}: ${correct}/${lesson.quiz.length}`); box.textContent = `Quiz finalizat: ${correct}/${lesson.quiz.length}. XP acordat și progres actualizat.`; return; }
      box.innerHTML = `<strong>${idx + 1}. ${q.q}</strong><div>${q.o.map(o => `<button class="hg-btn hg-quiz-option" data-answer="${o}">${o}</button>`).join('')}</div>`;
      box.querySelectorAll('[data-answer]').forEach(b => b.addEventListener('click', () => { if (b.dataset.answer === q.a) correct++; idx++; ask(); }));
    };
    ask();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  setTimeout(mount, 900);
})();
