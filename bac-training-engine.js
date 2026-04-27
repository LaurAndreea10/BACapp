(() => {
  const STATE_KEY = 'bac_training_engine_state';
  const PUBLIC_KEY = 'bac_public_state';
  const today = () => new Date().toISOString().slice(0, 10);

  const levelNames = ['Începător BAC', 'Eseu controlat', 'Simulare pregătită', 'Ritm de examen', 'Pregătit pentru 9+'];
  const questions = [
    { subject: 'Română', chapter: 'Roman realist', difficulty: 'Ușor', prompt: 'Ce trebuie evitat într-un eseu la BAC?', options: ['Rezumatul operei', 'Comentarea scenelor', 'Folosirea conectorilor', 'Concluzia clară'], correct: 0, explanation: 'La BAC se punctează interpretarea, nu simpla povestire.', trap: 'Capcana frecventă este să povestești acțiunea fără să explici rolul scenei.', next: 'Repetă fișa: eseu în 6 pași.' },
    { subject: 'Română', chapter: 'Roman realist', difficulty: 'Mediu', prompt: 'Ce scenă susține tema romanului Ion?', options: ['Hora din Pripas', 'O descriere fără conflict', 'O replică izolată', 'Titlul revistei'], correct: 0, explanation: 'Hora concentrează ierarhiile satului și anunță conflictul pentru pământ.', trap: 'Nu orice scenă e relevantă; alege una care arată tema și conflictul.', next: 'Fă încă 2 întrebări despre scene semnificative.' },
    { subject: 'Română', chapter: 'Roman realist', difficulty: 'Greu', prompt: 'De ce scena horei are valoare realistă și socială?', options: ['Arată ierarhia satului și raportul dintre avere și statut', 'Este doar decor festiv', 'Elimină conflictul romanului', 'Nu are legătură cu personajele'], correct: 0, explanation: 'Scena arată comunitatea, diferențele sociale și motivațiile personajelor.', trap: 'Capcana este să o tratezi ca simplă povestire.', next: 'Repetă diferența dintre rezumat și interpretare.' },
    { subject: 'Română', chapter: 'Text argumentativ', difficulty: 'Ușor', prompt: 'Ce trebuie să apară clar la începutul unui text argumentativ?', options: ['Opinia/teza', 'Baremul', 'Biografia autorului', 'Lista operelor'], correct: 0, explanation: 'Textul argumentativ pornește de la o opinie clară, susținută apoi prin argumente.', trap: 'Nu începe cu exemple fără să spui ce susții.', next: 'Repetă structura: opinie, argumente, exemple, concluzie.' },
    { subject: 'Matematică', chapter: 'Derivate', difficulty: 'Ușor', prompt: 'Dacă f(x)=x², atunci f’(x)=', options: ['2x', 'x', '2', 'x²'], correct: 0, explanation: 'Se aplică regula (xⁿ)’ = n·xⁿ⁻¹.', trap: 'Capcana este să uiți exponentul coborât în față.', next: 'Repetă regulile de derivare.' },
    { subject: 'Matematică', chapter: 'Derivate', difficulty: 'Mediu', prompt: 'Dacă f’(x)>0 pe un interval, funcția este:', options: ['Crescătoare', 'Descrescătoare', 'Constantă', 'Nedefinită'], correct: 0, explanation: 'Derivata pozitivă indică o funcție crescătoare.', trap: 'Nu confunda semnul derivatei cu semnul funcției.', next: 'Fă un tabel de variație simplu.' },
    { subject: 'Matematică', chapter: 'Derivate', difficulty: 'Greu', prompt: 'Pentru extreme locale, cauți în primul rând:', options: ['f’(x)=0 sau puncte unde derivata nu există', 'Doar f(0)', 'Doar intersecțiile cu Ox', 'Valoarea maximă din enunț'], correct: 0, explanation: 'Extremele locale se analizează prin puncte critice și semnul derivatei.', trap: 'Nu ajunge să rezolvi f(x)=0; aceea dă rădăcini, nu extreme.', next: 'Repetă puncte critice și monotonia.' },
    { subject: 'Istorie', chapter: 'Constituții', difficulty: 'Ușor', prompt: 'Ce constituție este asociată României Mari?', options: ['Constituția din 1923', 'Constituția din 1938', 'Constituția din 1965', 'Constituția din 1948'], correct: 0, explanation: 'Constituția din 1923 consolidează cadrul României Mari.', trap: 'Nu confunda 1923 cu 1938, care marchează autoritarismul regal.', next: 'Repetă fișa despre constituțiile României.' },
    { subject: 'Istorie', chapter: 'Comunism', difficulty: 'Mediu', prompt: 'Naționalizarea din 1948 înseamnă:', options: ['Trecerea proprietăților private la stat', 'Introducerea monarhiei', 'Unirea provinciilor', 'Aderarea la UE'], correct: 0, explanation: 'Naționalizarea este o măsură comunistă prin care statul preia proprietăți private.', trap: 'Nu o confunda cu reforma constituțională sau cu unirea.', next: 'Repetă comunismul postbelic.' },
    { subject: 'Geografie', chapter: 'Climă', difficulty: 'Ușor', prompt: 'Climatul majoritar al României este:', options: ['Temperat-continental', 'Ecuatorial', 'Polar', 'Musonic'], correct: 0, explanation: 'România este în zona climatului temperat-continental, cu influențe regionale.', trap: 'Nu confunda influențele climatice cu tipul climatic de bază.', next: 'Repetă harta influențelor climatice.' },
    { subject: 'Biologie', chapter: 'Genetică', difficulty: 'Mediu', prompt: 'Raportul 3:1 apare frecvent la:', options: ['Monohibridare cu dominanță completă', 'Funcții derivate', 'Climă temperat-continentală', 'Text argumentativ'], correct: 0, explanation: 'Raportul 3:1 este tipic pentru monohibridarea mendeliană cu dominanță completă.', trap: 'Capcana este să memorezi raportul fără context.', next: 'Repetă legile lui Mendel.' },
    { subject: 'Chimie', chapter: 'pH', difficulty: 'Ușor', prompt: 'O soluție cu pH 7 este:', options: ['Neutră', 'Acidă', 'Bazică', 'Oxidantă obligatoriu'], correct: 0, explanation: 'pH 7 indică neutralitatea în condiții uzuale.', trap: 'Nu confunda pH 7 cu acid sau bază slabă.', next: 'Repetă scala pH.' },
    { subject: 'Fizică', chapter: 'Electricitate', difficulty: 'Ușor', prompt: 'Legea lui Ohm este:', options: ['U = R · I', 'F = m · a', 'E = mgh', 'pH = -log[H+]'], correct: 0, explanation: 'Legea lui Ohm leagă tensiunea, rezistența și intensitatea curentului.', trap: 'Nu confunda formulele din mecanică și electricitate.', next: 'Repetă unitățile: V, Ω, A.' },
    { subject: 'Informatică', chapter: 'Algoritmi', difficulty: 'Mediu', prompt: 'O structură repetitivă se folosește pentru:', options: ['Executarea repetată a unor instrucțiuni', 'Definirea unui autor', 'Calcularea pH-ului', 'Descrierea reliefului'], correct: 0, explanation: 'For/while repetă instrucțiuni cât timp o condiție este îndeplinită.', trap: 'Nu confunda structura repetitivă cu structura decizională.', next: 'Repetă for, while și do-while.' }
  ];

  function read(key, fallback) { try { return { ...fallback, ...JSON.parse(localStorage.getItem(key) || '{}') }; } catch { return { ...fallback }; } }
  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); return value; }
  function engineState() { return read(STATE_KEY, { sessions: 0, correct: 0, wrong: 0, wrongBank: [], history: [], lastSession: '', streakFreeze: 1, streakRewards: [], shared: 0, calendarStart: today() }); }
  function publicState(patch = {}) {
    const base = read(PUBLIC_KEY, { xp: 0, streak: 0, lessons: 0, quizzes: 0, exams: 0, correct: 0, wrong: 0, reports: 0 });
    const next = write(PUBLIC_KEY, { ...base, ...patch });
    ['xp', 'streak', 'lessons', 'quizzes', 'exams', 'correct', 'wrong', 'reports'].forEach(k => { const el = document.getElementById(k); if (el) el.textContent = next[k] || 0; });
    const level = Math.min(4, Math.floor((next.xp || 0) / 120));
    const bar = document.getElementById('levelBar');
    const text = document.getElementById('levelText');
    if (bar) bar.style.width = `${Math.min(100, ((next.xp || 0) % 120) / 120 * 100)}%`;
    if (text) text.textContent = `Nivel ${level + 1}: ${levelNames[level]} · ${next.xp || 0} XP total`;
    return next;
  }
  function shuffle(list) { return [...list].sort(() => Math.random() - 0.5); }
  function byWeakness() {
    const s = engineState();
    const weakChapters = [...new Set((s.wrongBank || []).map(q => q.chapter))];
    const pool = weakChapters.length ? questions.filter(q => weakChapters.includes(q.chapter)) : questions;
    return shuffle(pool).slice(0, 5);
  }
  function pickQuick() { return shuffle(questions).slice(0, 5); }
  function pickTimed() { return shuffle(questions).slice(0, 10); }

  function styles() {
    if (document.getElementById('bac-training-engine-css')) return;
    const style = document.createElement('style');
    style.id = 'bac-training-engine-css';
    style.textContent = `
      .training-card{border:1px solid rgba(60,207,190,.32);background:linear-gradient(180deg,rgba(60,207,190,.08),rgba(13,20,36,.88));border-radius:24px;padding:22px;margin-top:20px}.training-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.training-panel{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.045);border-radius:18px;padding:16px}.training-options{display:grid;gap:10px;margin-top:14px}.training-options button{text-align:left}.training-feedback{border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:14px;margin-top:12px}.training-feedback.ok{border-color:rgba(80,200,120,.5);background:rgba(80,200,120,.09)}.training-feedback.bad{border-color:rgba(232,96,96,.5);background:rgba(232,96,96,.09)}.daily-list{margin:0;padding-left:20px}.calendar-row{display:grid;grid-template-columns:110px 1fr auto;gap:10px;align-items:center;border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0}.share-card{border:1px dashed rgba(228,168,76,.45);background:rgba(228,168,76,.08);border-radius:18px;padding:18px;margin-top:12px}.faq details{border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px;margin-top:10px;background:rgba(255,255,255,.04)}.engine-badges{display:flex;flex-wrap:wrap;gap:8px}.engine-badges span{border:1px solid rgba(228,168,76,.4);background:rgba(228,168,76,.08);border-radius:999px;padding:7px 10px}.timer-chip{font-weight:900;color:var(--gold,#e4a84c)}@media(max-width:850px){.training-grid,.calendar-row{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function setSeoAndHero() {
    document.title = 'BAC Space – simulator BAC 2026 cu quiz-uri, subiecte, eseuri și plan de învățare';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = 'Pregătește-te pentru Bacalaureat cu quiz-uri interactive, lecții scurte, simulări, subiecte oficiale și progres salvat local. Pentru Română, Matematică, Istorie, Geografie și Științe.';
    const h1 = document.querySelector('.hero h1');
    const lead = document.querySelector('.hero .lead');
    const actions = document.querySelector('.hero .actions');
    if (h1) h1.textContent = 'Învață pentru BAC prin quiz-uri scurte, simulări și feedback instant.';
    if (lead) lead.textContent = 'Alege profilul, fă prima lecție și vezi exact ce trebuie să repeți. Progresul, greșelile și raportul se salvează local în browser.';
    if (actions && !document.getElementById('startQuickTraining')) {
      actions.innerHTML = '<button class="btn primary" id="startQuickTraining" type="button">Începe quiz-ul de 5 întrebări</button><a class="btn teal" href="#daily-session">Alege profilul meu</a><a class="btn" href="#subiecte">Vezi subiecte oficiale</a>';
      actions.querySelector('#startQuickTraining').addEventListener('click', () => {
        document.getElementById('training-quiz-engine')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => document.getElementById('quickQuizBtn')?.click(), 250);
      });
    }
  }

  function renderDaily(root) {
    const s = engineState();
    const p = publicState();
    const completedToday = s.lastSession === today();
    const level = levelNames[Math.min(4, Math.floor((p.xp || 0) / 120))];
    root.innerHTML = `
      <section id="daily-session" class="wrap training-card">
        <span class="badge">Rutina zilnică</span>
        <h2>Azi ai de făcut</h2>
        <div class="training-grid">
          <article class="training-panel"><h3>Plan 10–15 minute</h3><ol class="daily-list"><li>1 lecție scurtă</li><li>1 quiz de 5 întrebări</li><li>1 recapitulare greșeli</li></ol><button class="btn primary" id="startDailySession" type="button">Începe sesiunea de azi</button></article>
          <article class="training-panel"><h3>Streak protejat</h3><p>${completedToday ? 'Ai lucrat azi. Streak-ul este activ.' : 'Ai o sesiune pregătită pentru azi.'}</p><p>Freeze disponibil: <strong>${s.streakFreeze || 0}</strong>/săptămână</p><button class="btn" id="useFreeze" type="button">Folosește streak freeze</button></article>
          <article class="training-panel"><h3>Nivel educațional</h3><p><strong>${level}</strong></p><div class="engine-badges"><span>3 zile: ritm</span><span>7 zile: disciplină</span><span>14 zile: examen</span></div></article>
        </div>
        <div id="dailyReport" class="training-panel" style="margin-top:14px"><strong>Raportul sesiunii</strong><p class="muted">Apare automat după quiz sau simulare.</p></div>
      </section>`;
    root.querySelector('#startDailySession').addEventListener('click', () => startQuiz('quick'));
    root.querySelector('#useFreeze').addEventListener('click', () => {
      const next = engineState();
      if ((next.streakFreeze || 0) > 0) { next.streakFreeze -= 1; write(STATE_KEY, next); root.querySelector('#useFreeze').textContent = 'Freeze folosit ✓'; }
      else root.querySelector('#useFreeze').textContent = 'Freeze indisponibil';
      renderDaily(root);
    });
  }

  let active = { list: [], index: 0, score: 0, wrong: [], mode: 'quick', seconds: 0, timer: null };
  function startQuiz(mode) {
    const root = document.getElementById('training-quiz-engine');
    if (!root) return;
    clearInterval(active.timer);
    active = { list: mode === 'weakness' ? byWeakness() : mode === 'timed' ? pickTimed() : pickQuick(), index: 0, score: 0, wrong: [], mode, seconds: mode === 'timed' ? 8 * 60 : 0, timer: null };
    if (mode === 'timed') active.timer = setInterval(() => { active.seconds -= 1; updateTimer(); if (active.seconds <= 0) finishQuiz(); }, 1000);
    drawQuestion();
  }
  function updateTimer() {
    const chip = document.getElementById('trainingTimer');
    if (!chip) return;
    const m = String(Math.floor(active.seconds / 60)).padStart(2, '0');
    const s = String(active.seconds % 60).padStart(2, '0');
    chip.textContent = `${m}:${s}`;
  }
  function drawQuestion() {
    const root = document.getElementById('trainingRunner');
    const q = active.list[active.index];
    if (!q) return finishQuiz();
    root.innerHTML = `
      <article class="training-panel"><span class="badge">${active.mode === 'timed' ? 'Simulare cronometrată' : active.mode === 'weakness' ? 'Quiz pe slăbiciuni' : 'Quiz rapid'}</span> <span class="pill">${q.subject}</span> <span class="pill">${q.chapter}</span> <span class="pill">${q.difficulty}</span> <span class="pill">${active.index + 1}/${active.list.length}</span> ${active.mode === 'timed' ? '<span class="pill timer-chip" id="trainingTimer"></span>' : ''}<h3>${q.prompt}</h3><div class="training-options">${q.options.map((o, i) => `<button class="btn" type="button" data-pick="${i}">${String.fromCharCode(65 + i)}. ${o}</button>`).join('')}</div><div id="trainingFeedback"></div><div class="actions"><button class="btn teal" id="nextTrainingQuestion" type="button" disabled>Următorul pas</button></div></article>`;
    updateTimer();
    root.querySelectorAll('[data-pick]').forEach(btn => btn.addEventListener('click', () => answerQuestion(Number(btn.dataset.pick))));
    root.querySelector('#nextTrainingQuestion').addEventListener('click', () => { active.index += 1; drawQuestion(); });
  }
  function answerQuestion(choice) {
    const q = active.list[active.index];
    const ok = choice === q.correct;
    if (ok) active.score += 1; else active.wrong.push(q);
    const p = publicState();
    publicState({ xp: (p.xp || 0) + (ok ? (q.difficulty === 'Greu' ? 20 : q.difficulty === 'Mediu' ? 15 : 10) : 2), correct: (p.correct || 0) + (ok ? 1 : 0), wrong: (p.wrong || 0) + (ok ? 0 : 1), streak: Math.max(p.streak || 0, 1) });
    const s = engineState();
    s.correct += ok ? 1 : 0; s.wrong += ok ? 0 : 1;
    if (!ok) s.wrongBank = [...(s.wrongBank || []), q].slice(-60);
    write(STATE_KEY, s);
    const fb = document.getElementById('trainingFeedback');
    fb.innerHTML = `<div class="training-feedback ${ok ? 'ok' : 'bad'}"><strong>${ok ? 'Corect.' : 'Aproape, dar nu.'}</strong><p>${ok ? q.explanation : `${q.options[choice]} nu este varianta potrivită. ${q.explanation}`}</p><p><strong>Capcană frecventă:</strong> ${q.trap}</p><p><strong>Recomandare:</strong> ${q.next}</p></div>`;
    document.querySelectorAll('#trainingRunner [data-pick]').forEach(b => { b.disabled = true; });
    document.getElementById('nextTrainingQuestion').disabled = false;
  }
  function finishQuiz() {
    clearInterval(active.timer);
    const s = engineState();
    const p = publicState();
    const percent = active.list.length ? Math.round(active.score / active.list.length * 100) : 0;
    s.sessions += 1; s.lastSession = today();
    s.history = [...(s.history || []), { date: new Date().toISOString(), mode: active.mode, score: active.score, total: active.list.length, percent, wrong: active.wrong.map(q => q.chapter) }].slice(-40);
    write(STATE_KEY, s);
    publicState({ quizzes: (p.quizzes || 0) + 1, exams: (p.exams || 0) + (active.mode === 'timed' ? 1 : 0), reports: (p.reports || 0) + 1 });
    const weak = [...new Set(active.wrong.map(q => q.chapter))];
    const report = `Scor: ${active.score}/${active.list.length}. Punct forte: ${active.score >= active.list.length / 2 ? 'ai identificat corect ideile centrale.' : 'ai început antrenamentul.'} De repetat: ${weak.length ? weak.join(', ') : 'menține ritmul.'} Următorul pas: ${weak.length ? '3 întrebări din capitolele greșite.' : 'o simulare cronometrată.'}`;
    document.getElementById('trainingRunner').innerHTML = `<article class="training-panel"><h3>Raport automat după sesiune</h3><p><strong>Scor:</strong> ${active.score}/${active.list.length} (${percent}%)</p><p>${report}</p><div class="share-card" id="shareCard">Am făcut ${active.score}/${active.list.length} la quiz-ul BAC pe BAC Space. ${percent}% pregătire azi.</div><div class="actions"><button class="btn primary" id="weaknessBtn" type="button">Quiz pe slăbiciuni</button><button class="btn teal" id="copyResult" type="button">Copiază rezultat</button><a class="btn" id="whatsappShare" target="_blank" rel="noopener">Distribuie pe WhatsApp</a><button class="btn" id="storyText" type="button">Card text pentru story</button></div></article>`;
    const text = document.getElementById('shareCard').textContent;
    document.getElementById('weaknessBtn').addEventListener('click', () => startQuiz('weakness'));
    document.getElementById('copyResult').addEventListener('click', async e => { try { await navigator.clipboard.writeText(text); e.target.textContent = 'Copiat ✓'; } catch { e.target.textContent = 'Copiază manual'; } });
    document.getElementById('whatsappShare').href = `https://wa.me/?text=${encodeURIComponent(text + ' https://laurandreea10.github.io/BACapp/')}`;
    document.getElementById('storyText').addEventListener('click', () => { document.getElementById('shareCard').textContent = `BAC Space\n${active.score}/${active.list.length} răspunsuri corecte\n${percent}% azi\n#BAC2026`; });
    const dailyReport = document.getElementById('dailyReport');
    if (dailyReport) dailyReport.innerHTML = `<strong>Raportul sesiunii</strong><p>${report}</p>`;
    renderMistakes(); renderCalendar(); publicState();
  }

  function renderQuizEngine(container) {
    container.innerHTML = `<section id="training-quiz-engine" class="wrap training-card"><span class="badge">Motor principal</span><h2>Quiz BAC interactiv</h2><p class="muted">Întrebare → alegere → feedback → explicație → următorul pas. Răspunsurile nu sunt afișate ca soluție până alegi o variantă.</p><div class="training-grid"><button class="btn primary" id="quickQuizBtn" type="button">Quiz rapid · 5 întrebări</button><button class="btn teal" id="weakQuizBtn" type="button">Quiz pe slăbiciuni</button><button class="btn" id="timedQuizBtn" type="button">Simulare cronometrată</button></div><div id="trainingRunner" style="margin-top:14px"></div></section>`;
    container.querySelector('#quickQuizBtn').addEventListener('click', () => startQuiz('quick'));
    container.querySelector('#weakQuizBtn').addEventListener('click', () => startQuiz('weakness'));
    container.querySelector('#timedQuizBtn').addEventListener('click', () => startQuiz('timed'));
  }
  function renderMistakes() {
    const box = document.getElementById('mistake-bank-engine'); if (!box) return;
    const s = engineState(); const groups = (s.wrongBank || []).reduce((a, q) => { a[q.chapter] = (a[q.chapter] || 0) + 1; return a; }, {});
    const entries = Object.entries(groups).sort((a, b) => b[1] - a[1]);
    box.innerHTML = `<section class="wrap training-card"><span class="badge">Retenție</span><h2>Greșelile mele</h2>${entries.length ? `<p>Ai greșit întrebări la: ${entries.map(([c,n]) => `<strong>${c}</strong> (${n})`).join(', ')}.</p><p>Revino mâine pentru recapitulare.</p><button class="btn primary" type="button" id="mistakeQuizBtn">Repetă greșelile acum</button>` : '<p class="muted">Încă nu ai greșeli salvate. Fă un quiz pentru recomandări personalizate.</p>'}</section>`;
    box.querySelector('#mistakeQuizBtn')?.addEventListener('click', () => startQuiz('weakness'));
  }
  function renderCalendar() {
    const box = document.getElementById('bac-calendar-engine'); if (!box) return;
    const days = ['Azi: Roman realist', 'Mâine: Caracterizare personaj', 'Vineri: Quiz recapitulativ', 'Duminică: Mini-simulare', 'Săptămâna viitoare: Constituții + derivate'];
    box.innerHTML = `<section class="wrap training-card"><span class="badge">Planul meu până la BAC</span><h2>Calendar realist</h2>${days.map((d,i) => `<div class="calendar-row"><strong>${i === 0 ? 'Azi' : `Ziua ${i+1}`}</strong><span>${d.replace(/^Azi: |^Mâine: |^Vineri: |^Duminică: /,'')}</span><span class="pill">${i === 0 ? 'start' : 'plan'}</span></div>`).join('')}</section>`;
  }
  function renderFAQ() {
    if (document.getElementById('seo-faq')) return;
    const main = document.querySelector('main') || document.body;
    const section = document.createElement('section'); section.id = 'seo-faq'; section.className = 'wrap training-card faq';
    section.innerHTML = `<span class="badge">FAQ</span><h2>Întrebări frecvente despre pregătirea BAC</h2>
      <details open><summary>Cum învăț eficient pentru BAC la Română?</summary><p>Lucrează zilnic: o fișă scurtă, un quiz de 5 întrebări și recapitularea greșelilor.</p></details>
      <details><summary>Cum repet eseurile pentru BAC?</summary><p>Nu memora doar rezumate. Repetă tema, două scene, două elemente de construcție și concluzia.</p></details>
      <details><summary>Cum funcționează quiz-urile?</summary><p>Alegi răspunsul, primești feedback, explicație, capcană frecventă și următorul pas.</p></details>
      <details><summary>Site-ul salvează datele?</summary><p>Da, progresul este salvat local în browser prin localStorage.</p></details>
      <details><summary>Este platformă oficială?</summary><p>Nu. BAC Space este simulator educațional independent și nu înlocuiește programa, profesorul sau baremul oficial.</p></details>`;
    main.appendChild(section);
  }
  function mount() {
    styles(); setSeoAndHero(); publicState();
    const progress = document.getElementById('progres');
    if (progress && !document.getElementById('daily-session-root')) { const r = document.createElement('div'); r.id = 'daily-session-root'; progress.insertAdjacentElement('afterend', r); renderDaily(r); }
    const quiz = document.getElementById('quiz');
    if (quiz && !document.getElementById('training-quiz-root')) { quiz.style.display = 'none'; const r = document.createElement('div'); r.id = 'training-quiz-root'; quiz.insertAdjacentElement('afterend', r); renderQuizEngine(r); }
    if (!document.getElementById('mistake-bank-engine')) { const r = document.createElement('div'); r.id = 'mistake-bank-engine'; document.getElementById('training-quiz-root')?.insertAdjacentElement('afterend', r); renderMistakes(); }
    if (!document.getElementById('bac-calendar-engine')) { const r = document.createElement('div'); r.id = 'bac-calendar-engine'; document.getElementById('mistake-bank-engine')?.insertAdjacentElement('afterend', r); renderCalendar(); }
    renderFAQ();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  setTimeout(mount, 800); setTimeout(mount, 1800);
})();
