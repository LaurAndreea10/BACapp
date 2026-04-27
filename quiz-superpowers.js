(() => {
  const ROOT_ID = 'quiz-pro';
  const STATE_KEY = 'bac_quiz_pro_state';
  const PUBLIC_KEY = 'bac_public_state';

  const questionBank = [
    { subject: 'Română', chapter: 'Roman realist', difficulty: 'Ușor', question: 'Ce trebuie evitat într-un eseu la roman?', answers: ['Rezumatul simplu al acțiunii', 'Analiza temei', 'Comentarea scenelor'], correct: 0, explanation: 'La BAC, rezumatul fără interpretare aduce punctaj mic. Eseul trebuie să demonstreze tema, scenele și elementele de construcție.' },
    { subject: 'Română', chapter: 'Roman realist', difficulty: 'Mediu', question: 'În romanul realist, personajele sunt adesea influențate de:', answers: ['Mediul social și economic', 'Magie', 'Hazard absolut'], correct: 0, explanation: 'Realismul urmărește verosimilul și determinarea socială, economică sau morală a personajelor.' },
    { subject: 'Română', chapter: 'Roman realist', difficulty: 'Greu', question: 'O scenă comentată corect trebuie să includă:', answers: ['Context, exemplu și interpretare', 'Doar povestire', 'Doar citat lung'], correct: 0, explanation: 'Pentru punctaj mare, scena trebuie legată de tema operei și de construcția personajelor.' },
    { subject: 'Română', chapter: 'Text argumentativ', difficulty: 'Ușor', question: 'Un text argumentativ începe de obicei cu:', answers: ['Teza/opinia', 'Baremul', 'Biografia autorului'], correct: 0, explanation: 'Textul argumentativ are nevoie de o opinie clară, apoi argumente și exemple.' },
    { subject: 'Română', chapter: 'Text argumentativ', difficulty: 'Mediu', question: 'Un argument bun trebuie susținut prin:', answers: ['Explicație și exemplu', 'O afirmație fără dovadă', 'O listă de autori'], correct: 0, explanation: 'Argumentul devine convingător prin explicație logică și exemplu relevant.' },
    { subject: 'Română', chapter: 'Poezie', difficulty: 'Mediu', question: 'Imaginarul poetic se referă la:', answers: ['Universul de imagini și simboluri al textului', 'Numărul de strofe', 'Biografia poetului'], correct: 0, explanation: 'Imaginarul poetic include imagini, simboluri, motive și câmpuri semantice.' },

    { subject: 'Matematică', chapter: 'Derivate', difficulty: 'Ușor', question: 'Derivata funcției f(x)=x² este:', answers: ['2x', 'x', '2'], correct: 0, explanation: 'Se aplică regula (xⁿ)’ = n·xⁿ⁻¹, deci (x²)’ = 2x.' },
    { subject: 'Matematică', chapter: 'Derivate', difficulty: 'Mediu', question: 'Dacă f’(x)>0 pe un interval, funcția este:', answers: ['Crescătoare', 'Descrescătoare', 'Constantă'], correct: 0, explanation: 'Semnul pozitiv al derivatei indică monotonia crescătoare.' },
    { subject: 'Matematică', chapter: 'Derivate', difficulty: 'Greu', question: 'Punctele critice se caută de obicei din condiția:', answers: ['f’(x)=0 sau f’ nedefinită', 'f(x)=1 mereu', 'x=0 mereu'], correct: 0, explanation: 'Pentru extreme locale se analizează valorile unde derivata este zero sau nu există.' },
    { subject: 'Matematică', chapter: 'Integrale', difficulty: 'Ușor', question: 'Integrala definită ∫[a,b] f(x) dx se calculează cu:', answers: ['F(b)-F(a)', 'F(a)-F(b)', 'f(a)+f(b)'], correct: 0, explanation: 'Formula Newton-Leibniz spune că integrala definită este F(b)-F(a), unde F este o primitivă.' },
    { subject: 'Matematică', chapter: 'Funcții', difficulty: 'Mediu', question: 'Tabelul de variație folosește în principal:', answers: ['Semnul derivatei', 'Doar valoarea lui f(0)', 'Numărul de litere din funcție'], correct: 0, explanation: 'Semnul derivatei arată intervalele de creștere și descreștere.' },

    { subject: 'Istorie', chapter: 'Constituții', difficulty: 'Ușor', question: 'Constituția asociată României Mari este:', answers: ['1923', '1938', '1965'], correct: 0, explanation: 'Constituția din 1923 consolidează cadrul politic al României Mari.' },
    { subject: 'Istorie', chapter: 'Constituții', difficulty: 'Mediu', question: 'Constituția din 1938 este asociată cu:', answers: ['Regimul autoritar al regelui Carol al II-lea', 'Unirea din 1918', 'Comunismul stalinist'], correct: 0, explanation: 'Constituția din 1938 marchează trecerea spre autoritarism regal.' },
    { subject: 'Istorie', chapter: 'Comunism', difficulty: 'Ușor', question: 'Naționalizarea din 1948 a însemnat:', answers: ['Trecerea unor proprietăți private la stat', 'Introducerea monarhiei', 'Formarea UE'], correct: 0, explanation: 'Naționalizarea este o măsură tipică regimului comunist, prin care statul preia proprietăți private.' },
    { subject: 'Istorie', chapter: 'Romanitatea românilor', difficulty: 'Mediu', question: 'Romanitatea românilor se referă la:', answers: ['Originea latină și continuitatea românilor', 'Istoria Greciei antice', 'Industrializarea României'], correct: 0, explanation: 'Conceptul vizează originea latină, limba română și continuitatea populației romanizate.' },

    { subject: 'Geografie', chapter: 'Relief', difficulty: 'Ușor', question: 'Carpații Meridionali mai sunt numiți:', answers: ['Alpii Transilvaniei', 'Munții Dobrogei', 'Câmpia de Vest'], correct: 0, explanation: 'Carpații Meridionali sunt cei mai înalți și sunt numiți și Alpii Transilvaniei.' },
    { subject: 'Geografie', chapter: 'Relief', difficulty: 'Mediu', question: 'Delta Dunării s-a format la vărsarea Dunării în:', answers: ['Marea Neagră', 'Marea Baltică', 'Oceanul Atlantic'], correct: 0, explanation: 'Delta Dunării se află la contactul Dunării cu Marea Neagră.' },
    { subject: 'Geografie', chapter: 'Climă', difficulty: 'Ușor', question: 'Climatul României este predominant:', answers: ['Temperat-continental', 'Ecuatorial', 'Polar'], correct: 0, explanation: 'România se află în zona climatului temperat-continental, cu influențe regionale.' },
    { subject: 'Geografie', chapter: 'Europa', difficulty: 'Mediu', question: 'Poziția României oferă legături între:', answers: ['Europa Centrală, Balcani și Marea Neagră', 'America de Sud și Australia', 'Polul Nord și Sahara'], correct: 0, explanation: 'România are poziție de legătură între spații geografice și economice importante.' },

    { subject: 'Biologie', chapter: 'Genetică', difficulty: 'Ușor', question: 'ADN-ul poartă informația:', answers: ['Genetică', 'Climatică', 'Economică'], correct: 0, explanation: 'ADN-ul conține informația ereditară transmisă între generații.' },
    { subject: 'Biologie', chapter: 'Genetică', difficulty: 'Mediu', question: 'Raportul 3:1 este specific pentru:', answers: ['Monohibridare cu dominanță completă', 'Relief carstic', 'Text argumentativ'], correct: 0, explanation: 'În experimentele mendeliene cu dominanță completă apare raportul fenotipic 3:1.' },
    { subject: 'Biologie', chapter: 'Anatomie', difficulty: 'Ușor', question: 'Inima are rol principal în:', answers: ['Pomparea sângelui', 'Digestia proteinelor', 'Fotosinteză'], correct: 0, explanation: 'Inima pompează sângele prin sistemul circulator.' },

    { subject: 'Chimie', chapter: 'pH', difficulty: 'Ușor', question: 'pH-ul 7 indică o soluție:', answers: ['Neutră', 'Acidă puternic', 'Bazică puternic'], correct: 0, explanation: 'pH 7 este valoarea neutră, specifică apei pure la condiții uzuale.' },
    { subject: 'Chimie', chapter: 'pH', difficulty: 'Mediu', question: 'O soluție cu pH mai mic decât 7 este:', answers: ['Acidă', 'Neutră', 'Mereu bazică'], correct: 0, explanation: 'Valorile sub 7 indică aciditate.' },
    { subject: 'Chimie', chapter: 'Stoichiometrie', difficulty: 'Ușor', question: 'Molul măsoară:', answers: ['Cantitatea de substanță', 'Lungimea', 'Timpul'], correct: 0, explanation: 'Molul este unitatea fundamentală pentru cantitatea de substanță.' },

    { subject: 'Fizică', chapter: 'Electricitate', difficulty: 'Ușor', question: 'Legea lui Ohm este:', answers: ['U = R · I', 'F = m · a', 'E = mgh'], correct: 0, explanation: 'Legea lui Ohm leagă tensiunea U, rezistența R și intensitatea I.' },
    { subject: 'Fizică', chapter: 'Mecanică', difficulty: 'Ușor', question: 'Energia cinetică depinde de:', answers: ['Masă și viteză', 'Doar volum', 'Doar temperatură'], correct: 0, explanation: 'Energia cinetică este Ec = m·v²/2, deci depinde de masă și viteză.' },
    { subject: 'Fizică', chapter: 'Mecanică', difficulty: 'Mediu', question: 'Unitatea de măsură pentru forță este:', answers: ['Newton', 'Joule pe mol', 'Volt'], correct: 0, explanation: 'Forța se măsoară în Newton, simbol N.' },

    { subject: 'Informatică', chapter: 'Algoritmi', difficulty: 'Ușor', question: 'O variabilă este:', answers: ['Un spațiu de memorie cu nume', 'Un tip de monitor', 'Un cablu'], correct: 0, explanation: 'Variabila stochează valori care pot fi folosite și modificate în algoritm.' },
    { subject: 'Informatică', chapter: 'Algoritmi', difficulty: 'Mediu', question: 'O structură repetitivă este folosită pentru:', answers: ['Executarea repetată a unor instrucțiuni', 'Ștergerea ecranului', 'Compunerea unui eseu'], correct: 0, explanation: 'Structurile repetitive, precum for sau while, repetă instrucțiuni cât timp condiția o permite.' },
    { subject: 'Informatică', chapter: 'Complexitate', difficulty: 'Mediu', question: 'Complexitatea O(n) indică o creștere:', answers: ['Liniară', 'Exponențială mereu', 'Zero indiferent de intrare'], correct: 0, explanation: 'O(n) înseamnă că timpul crește proporțional cu dimensiunea intrării.' }
  ];

  const badges = [
    ['starter', 'Quiz Starter', 'Finalizează primul quiz', s => s.completed >= 1],
    ['chapters', 'Navigator pe capitole', 'Finalizează quiz-uri din 3 capitole diferite', s => Object.keys(s.byChapter || {}).length >= 3],
    ['recovery', 'Recuperare activă', 'Rezolvă un quiz din greșeli', s => s.wrongMode >= 1],
    ['reporter', 'Analist BAC', 'Deschide un raport pe materii', s => s.reports >= 1],
    ['exporter', 'Progres exportat', 'Exportă raportul de progres', s => s.exports >= 1],
    ['master', 'BAC Master', 'Obține minimum 90% la un quiz', s => s.bestScore >= 90]
  ];

  function read(key, fallback) {
    try { return { ...fallback, ...JSON.parse(localStorage.getItem(key) || '{}') }; }
    catch { return { ...fallback }; }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  function state() {
    return read(STATE_KEY, { completed: 0, correct: 0, wrong: 0, bestScore: 0, wrongBank: [], history: [], bySubject: {}, byChapter: {}, wrongMode: 0, reports: 0, exports: 0, unlocked: [] });
  }

  function saveState(next) {
    return write(STATE_KEY, next);
  }

  function publicProgress(patch) {
    const base = read(PUBLIC_KEY, { xp: 0, streak: 0, lessons: 0, quizzes: 0, exams: 0, correct: 0, wrong: 0, reports: 0 });
    const next = write(PUBLIC_KEY, { ...base, ...patch });
    ['xp', 'streak', 'lessons', 'quizzes', 'exams', 'correct', 'wrong', 'reports'].forEach(k => {
      const el = document.getElementById(k);
      if (el) el.textContent = next[k] || 0;
    });
    const bar = document.getElementById('levelBar');
    const text = document.getElementById('levelText');
    if (bar) bar.style.width = `${(next.xp || 0) % 100}%`;
    if (text) text.textContent = `Nivel ${Math.floor((next.xp || 0) / 100) + 1} · ${next.xp || 0} XP total`;
    return next;
  }

  function unique(field, list = questionBank) {
    return [...new Set(list.map(q => q[field]))].sort((a, b) => a.localeCompare(b, 'ro'));
  }

  function shuffle(list) {
    return [...list].sort(() => Math.random() - 0.5);
  }

  function ensureStyles() {
    if (document.getElementById('quiz-superpowers-css')) return;
    const style = document.createElement('style');
    style.id = 'quiz-superpowers-css';
    style.textContent = `
      .quiz-pro{border:1px solid rgba(155,140,255,.3);background:linear-gradient(180deg,rgba(155,140,255,.09),rgba(13,20,36,.86));border-radius:24px;padding:22px;margin-top:20px}
      .quiz-pro-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
      .quiz-pro-card,.quiz-pro-panel{border:1px solid var(--line,rgba(255,255,255,.12));background:rgba(255,255,255,.045);border-radius:18px;padding:16px;margin-top:12px}
      .chapter-buttons,.difficulty-buttons-pro{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
      .chapter-btn,.difficulty-pro-btn{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:var(--txt,#e8ecf8);border-radius:999px;padding:9px 12px;font-weight:850;cursor:pointer}
      .chapter-btn[aria-pressed="true"],.difficulty-pro-btn[aria-pressed="true"]{background:linear-gradient(135deg,var(--gold,#e4a84c),#c87c31);color:#080b12;border-color:rgba(228,168,76,.7)}
      .answer-list{display:grid;gap:10px;margin-top:12px}.answer-list button{text-align:left}
      .pro-feedback{margin-top:12px;border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px}.pro-feedback.ok{color:var(--green,#50c878);border-color:rgba(80,200,120,.35)}.pro-feedback.bad{color:var(--rose,#e86060);border-color:rgba(232,96,96,.35)}
      .subject-report{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;border-bottom:1px solid rgba(255,255,255,.08);padding:8px 0}.subject-report:last-child{border-bottom:0}
      .profile-badges{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.profile-badge{border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px;background:rgba(255,255,255,.04)}.profile-badge.unlocked{border-color:rgba(228,168,76,.55);background:rgba(228,168,76,.1)}
      .export-box{white-space:pre-wrap;background:rgba(0,0,0,.18);border-radius:14px;padding:12px;max-height:220px;overflow:auto}
      @media(max-width:850px){.quiz-pro-grid,.profile-badges{grid-template-columns:1fr}.subject-report{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function unlockBadges(s) {
    const unlocked = new Set(s.unlocked || []);
    let changed = false;
    badges.forEach(([id,, , test]) => {
      if (test(s) && !unlocked.has(id)) {
        unlocked.add(id);
        changed = true;
      }
    });
    if (changed) {
      s.unlocked = [...unlocked];
      saveState(s);
    }
    return s.unlocked || [];
  }

  function renderProfileBadges() {
    const progress = document.getElementById('progres');
    if (!progress) return;
    let panel = document.getElementById('quiz-profile-badges');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'quiz-profile-badges';
      panel.className = 'quiz-pro-panel';
      panel.innerHTML = '<h3>🏆 Badge-uri Quiz Pro</h3><div class="profile-badges"></div>';
      progress.appendChild(panel);
    }
    const s = state();
    const unlocked = new Set(unlockBadges(s));
    panel.querySelector('.profile-badges').innerHTML = badges.map(([id, title, desc]) => `<div class="profile-badge ${unlocked.has(id) ? 'unlocked' : ''}"><strong>${unlocked.has(id) ? '🏆' : '🔒'} ${title}</strong><br><span>${desc}</span></div>`).join('');
  }

  function filteredQuestions(root) {
    const subject = root.querySelector('#pro-subject').value;
    const chapter = root.querySelector('#pro-chapter').value;
    const difficulty = root.querySelector('[data-pro-difficulty][aria-pressed="true"]')?.dataset.proDifficulty || 'Toate';
    let pool = questionBank.filter(q =>
      (subject === 'Toate' || q.subject === subject) &&
      (chapter === 'Toate' || q.chapter === chapter) &&
      (difficulty === 'Toate' || q.difficulty === difficulty)
    );
    if (!pool.length) pool = questionBank.filter(q => subject === 'Toate' || q.subject === subject);
    return shuffle(pool).slice(0, Math.min(5, pool.length));
  }

  function updateChapters(root) {
    const subject = root.querySelector('#pro-subject').value;
    const chapters = unique('chapter', questionBank.filter(q => subject === 'Toate' || q.subject === subject));
    const select = root.querySelector('#pro-chapter');
    select.innerHTML = ['Toate', ...chapters].map(c => `<option>${c}</option>`).join('');
    const buttons = root.querySelector('#chapter-buttons');
    buttons.innerHTML = ['Toate', ...chapters].map(c => `<button class="chapter-btn" type="button" data-chapter="${c}" aria-pressed="${c === 'Toate'}">${c}</button>`).join('');
    buttons.querySelectorAll('[data-chapter]').forEach(button => button.addEventListener('click', () => {
      select.value = button.dataset.chapter;
      buttons.querySelectorAll('[data-chapter]').forEach(b => b.setAttribute('aria-pressed', b === button ? 'true' : 'false'));
    }));
  }

  function recordAnswer(q, ok) {
    const s = state();
    const p = read(PUBLIC_KEY, { xp: 0, streak: 0, correct: 0, wrong: 0 });
    if (ok) {
      s.correct += 1;
      publicProgress({ xp: (p.xp || 0) + (q.difficulty === 'Greu' ? 20 : q.difficulty === 'Mediu' ? 15 : 10), correct: (p.correct || 0) + 1, streak: Math.max(p.streak || 0, 1) });
    } else {
      s.wrong += 1;
      s.wrongBank = [...(s.wrongBank || []), q].slice(-50);
      publicProgress({ wrong: (p.wrong || 0) + 1, streak: Math.max(p.streak || 0, 1) });
    }
    s.bySubject[q.subject] = s.bySubject[q.subject] || { correct: 0, wrong: 0 };
    s.byChapter[q.chapter] = s.byChapter[q.chapter] || { correct: 0, wrong: 0 };
    if (ok) { s.bySubject[q.subject].correct += 1; s.byChapter[q.chapter].correct += 1; }
    else { s.bySubject[q.subject].wrong += 1; s.byChapter[q.chapter].wrong += 1; }
    saveState(s);
  }

  function run(root, list, label, isWrongMode = false) {
    const runner = root.querySelector('#pro-runner');
    if (!list.length) {
      runner.innerHTML = '<div class="quiz-pro-card"><h3>Nu există întrebări pentru selecția curentă.</h3><p>Alege altă materie, capitol sau dificultate.</p></div>';
      return;
    }
    let index = 0;
    let score = 0;
    const details = [];

    function draw() {
      const q = list[index];
      runner.innerHTML = `<div class="quiz-pro-card"><span class="badge">${label}</span> <span class="pill">${q.subject}</span> <span class="pill">${q.chapter}</span> <span class="pill">${q.difficulty}</span> <span class="pill">${index + 1}/${list.length}</span><h3>${q.question}</h3><div class="answer-list">${q.answers.map((a, i) => `<button class="btn" type="button" data-answer="${i}">${a}</button>`).join('')}</div><div class="pro-feedback" hidden></div><div class="actions"><button class="btn teal" id="pro-next" disabled>${index === list.length - 1 ? 'Finalizează' : 'Următoarea'}</button></div></div>`;
      let answered = false;
      runner.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const ok = Number(button.dataset.answer) === q.correct;
        if (ok) score += 1;
        details.push({ subject: q.subject, chapter: q.chapter, ok });
        recordAnswer(q, ok);
        const fb = runner.querySelector('.pro-feedback');
        fb.hidden = false;
        fb.className = `pro-feedback ${ok ? 'ok' : 'bad'}`;
        fb.innerHTML = `${ok ? '<strong>Corect!</strong>' : '<strong>Greșit.</strong>'}<br><strong>Explicație:</strong> ${q.explanation}`;
        runner.querySelectorAll('[data-answer]').forEach(b => { b.disabled = true; });
        runner.querySelector('#pro-next').disabled = false;
      }));
      runner.querySelector('#pro-next').addEventListener('click', () => {
        if (index < list.length - 1) { index += 1; draw(); }
        else finish();
      });
    }

    function finish() {
      const percent = Math.round((score / list.length) * 100);
      const s = state();
      const p = read(PUBLIC_KEY, { quizzes: 0 });
      s.completed += 1;
      s.bestScore = Math.max(s.bestScore || 0, percent);
      if (isWrongMode) s.wrongMode += 1;
      s.history = [...(s.history || []), { date: new Date().toISOString(), label, score, total: list.length, percent, details }].slice(-30);
      saveState(s);
      publicProgress({ quizzes: (p.quizzes || 0) + 1 });
      renderReport(root, details, percent);
      renderWrongBank(root);
      renderProfileBadges();
      runner.innerHTML = `<div class="quiz-pro-card"><h3>Rezultat: ${score}/${list.length} (${percent}%)</h3><p>${percent >= 90 ? 'Excelent — ai deblocat progres de top.' : percent >= 70 ? 'Bine — repetă capitolele unde ai greșit.' : 'Recomandare: folosește „De repetat acum”.'}</p><div class="actions"><button class="btn primary" id="pro-repeat-wrong">De repetat acum</button><button class="btn teal" id="pro-export-now">Export progres</button></div></div>`;
      runner.querySelector('#pro-repeat-wrong').addEventListener('click', () => runWrong(root));
      runner.querySelector('#pro-export-now').addEventListener('click', () => exportProgress(root));
    }

    draw();
  }

  function renderReport(root, details = [], scorePercent = null) {
    const s = state();
    s.reports += 1;
    saveState(s);
    const report = root.querySelector('#pro-report');
    const source = details.length ? details.reduce((acc, item) => {
      acc[item.subject] = acc[item.subject] || { correct: 0, wrong: 0 };
      item.ok ? acc[item.subject].correct += 1 : acc[item.subject].wrong += 1;
      return acc;
    }, {}) : s.bySubject;
    const rows = Object.entries(source).map(([subject, v]) => {
      const total = v.correct + v.wrong;
      const pct = total ? Math.round((v.correct / total) * 100) : 0;
      return `<div class="subject-report"><span><strong>${subject}</strong><br>${v.correct} corecte · ${v.wrong} greșite</span><strong>${pct}%</strong></div>`;
    }).join('') || '<p class="muted">Finalizează un quiz pentru raport.</p>';
    const weak = Object.entries(s.byChapter || {}).map(([chapter, v]) => ({ chapter, pct: (v.correct + v.wrong) ? Math.round((v.correct / (v.correct + v.wrong)) * 100) : 0 })).sort((a, b) => a.pct - b.pct).slice(0, 3);
    report.innerHTML = `<h3>Raport pe materii</h3>${scorePercent !== null ? `<p class="muted">Ultimul scor: <strong>${scorePercent}%</strong></p>` : ''}${rows}<h4>Recomandări</h4><p>${weak.length ? `Repetă: ${weak.map(w => `${w.chapter} (${w.pct}%)`).join(', ')}.` : 'După primele quiz-uri, recomandările apar aici.'}</p>`;
    renderProfileBadges();
  }

  function renderWrongBank(root) {
    const s = state();
    const box = root.querySelector('#pro-wrong-bank');
    box.innerHTML = (s.wrongBank || []).slice(-8).reverse().map(q => `<div class="quiz-pro-card"><strong>${q.subject} · ${q.chapter}</strong><br>${q.question}<br><span class="muted">${q.explanation}</span></div>`).join('') || '<p class="muted">Nu ai greșeli salvate încă.</p>';
  }

  function runWrong(root) {
    const s = state();
    const list = shuffle(s.wrongBank || []).slice(0, 5);
    run(root, list, 'De repetat acum', true);
  }

  function exportText() {
    const s = state();
    const lines = [];
    lines.push('Raport BAC Space — Quiz Pro');
    lines.push(`Quiz-uri finalizate: ${s.completed}`);
    lines.push(`Corecte: ${s.correct}`);
    lines.push(`Greșite: ${s.wrong}`);
    lines.push(`Cel mai bun scor: ${s.bestScore}%`);
    lines.push('');
    lines.push('Pe materii:');
    Object.entries(s.bySubject || {}).forEach(([subject, v]) => {
      const total = v.correct + v.wrong;
      const pct = total ? Math.round((v.correct / total) * 100) : 0;
      lines.push(`- ${subject}: ${pct}% (${v.correct} corecte, ${v.wrong} greșite)`);
    });
    lines.push('');
    lines.push('Capitole de repetat:');
    Object.entries(s.byChapter || {}).map(([chapter, v]) => ({ chapter, pct: (v.correct + v.wrong) ? Math.round((v.correct / (v.correct + v.wrong)) * 100) : 0 })).sort((a, b) => a.pct - b.pct).slice(0, 5).forEach(item => lines.push(`- ${item.chapter}: ${item.pct}%`));
    return lines.join('\n');
  }

  function exportProgress(root) {
    const s = state();
    s.exports += 1;
    saveState(s);
    const text = exportText();
    const out = root.querySelector('#pro-export');
    out.innerHTML = `<h3>Export progres</h3><div class="export-box">${text.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</div><div class="actions"><button class="btn teal" id="download-report">Descarcă TXT</button><button class="btn" id="print-report">Printează / salvează PDF</button></div>`;
    out.querySelector('#download-report').addEventListener('click', () => {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'raport-bac-space.txt';
      a.click();
      URL.revokeObjectURL(url);
    });
    out.querySelector('#print-report').addEventListener('click', () => window.print());
    renderProfileBadges();
  }

  function mount() {
    if (document.getElementById(ROOT_ID)) return;
    ensureStyles();
    const main = document.querySelector('main') || document.body;
    const anchor = document.getElementById('quiz-arena') || document.getElementById('quiz') || main.firstElementChild;
    const root = document.createElement('section');
    root.id = ROOT_ID;
    root.className = 'wrap quiz-pro';
    root.innerHTML = `
      <span class="badge">Quiz Pro · toate îmbunătățirile</span>
      <h2>Quiz Pro pe capitole, rapoarte și export</h2>
      <p class="muted">Aici găsești cele 7 îmbunătățiri: capitole, întrebări extinse, explicații, raport pe materii, repetare greșeli, export progres și badge-uri în profil.</p>
      <div class="quiz-pro-grid">
        <label>Materie<select id="pro-subject"><option>Toate</option>${unique('subject').map(s => `<option>${s}</option>`).join('')}</select></label>
        <label>Capitol<select id="pro-chapter"><option>Toate</option></select></label>
        <div><strong>Dificultate</strong><div class="difficulty-buttons-pro">${['Toate', 'Ușor', 'Mediu', 'Greu'].map((d, i) => `<button class="difficulty-pro-btn" type="button" data-pro-difficulty="${d}" aria-pressed="${i === 0}">${d}</button>`).join('')}</div></div>
        <div><button class="btn primary" id="pro-start" type="button" style="margin-top:24px">Pornește Quiz Pro</button></div>
      </div>
      <div><strong>Capitole rapide</strong><div id="chapter-buttons" class="chapter-buttons"></div></div>
      <div class="actions"><button class="btn teal" id="pro-wrong-now" type="button">De repetat acum</button><button class="btn" id="pro-show-report" type="button">Raport pe materii</button><button class="btn" id="pro-export-btn" type="button">Export progres</button></div>
      <div id="pro-runner"></div>
      <div class="grid2" style="margin-top:14px"><article class="card" id="pro-report"><h3>Raport pe materii</h3><p class="muted">Finalizează un quiz ca să vezi procentele.</p></article><article class="card"><h3>De repetat</h3><div id="pro-wrong-bank"></div></article></div>
      <article class="card" id="pro-export" style="margin-top:14px"><h3>Export progres</h3><p class="muted">Apasă „Export progres” pentru raport TXT sau PDF prin print.</p></article>
    `;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(root, anchor.nextSibling);
    else main.appendChild(root);

    updateChapters(root);
    root.querySelector('#pro-subject').addEventListener('change', () => updateChapters(root));
    root.querySelectorAll('[data-pro-difficulty]').forEach(button => button.addEventListener('click', () => {
      root.querySelectorAll('[data-pro-difficulty]').forEach(b => b.setAttribute('aria-pressed', b === button ? 'true' : 'false'));
    }));
    root.querySelector('#pro-start').addEventListener('click', () => run(root, filteredQuestions(root), 'Quiz Pro'));
    root.querySelector('#pro-wrong-now').addEventListener('click', () => runWrong(root));
    root.querySelector('#pro-show-report').addEventListener('click', () => renderReport(root));
    root.querySelector('#pro-export-btn').addEventListener('click', () => exportProgress(root));
    renderWrongBank(root);
    renderReport(root);
    renderProfileBadges();
  }

  function boot() {
    mount();
    setTimeout(mount, 800);
    setTimeout(renderProfileBadges, 1200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
