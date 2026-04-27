(() => {
  const rootId = 'quiz-arena';
  const stateKey = 'bac_quiz_state';
  const publicKey = 'bac_public_state';
  const questions = [
    { s: 'Română', d: 'Ușor', c: 'Eseu', q: 'Ce trebuie evitat într-un eseu literar?', a: ['Rezumatul operei fără interpretare', 'Exemplele concrete', 'Concluzia clară'], ok: 0, xp: 10, h: 'Eseul cere idee, exemplu și interpretare.' },
    { s: 'Română', d: 'Mediu', c: 'Roman realist', q: 'Verosimilitatea în romanul realist înseamnă că lumea pare:', a: ['Credibilă și determinată social', 'Fantastică', 'Fără legătură cu realitatea'], ok: 0, xp: 15, h: 'Recitește partea despre realism.' },
    { s: 'Română', d: 'Greu', c: 'Argumentativ', q: 'Structura potrivită pentru text argumentativ este:', a: ['Teză, argumente, exemple, concluzie', 'Biografia autorului', 'Doar opinie'], ok: 0, xp: 20, h: 'Reia schema textului argumentativ.' },
    { s: 'Matematică', d: 'Ușor', c: 'Derivate', q: 'Pentru f(x)=x²-4x+3, f’(x)=', a: ['2x-4', 'x-4', '2x+3'], ok: 0, xp: 10, h: 'Derivează termen cu termen.' },
    { s: 'Matematică', d: 'Mediu', c: 'Integrale', q: 'Integrala definită se calculează cu:', a: ['F(b)-F(a)', 'F(a)-F(b)', 'f(b)-f(a)'], ok: 0, xp: 15, h: 'Folosește formula Newton-Leibniz.' },
    { s: 'Matematică', d: 'Greu', c: 'Monotonie', q: 'Dacă f’(x)>0 pe un interval, funcția este:', a: ['Crescătoare', 'Descrescătoare', 'Constantă'], ok: 0, xp: 20, h: 'Semnul derivatei dă monotonia.' },
    { s: 'Istorie', d: 'Ușor', c: 'Constituții', q: 'Ce constituție este asociată României Mari?', a: ['Constituția din 1923', 'Constituția din 1938', 'Constituția din 1965'], ok: 0, xp: 10, h: 'Recitește partea despre Constituția din 1923.' },
    { s: 'Istorie', d: 'Mediu', c: 'Comunism', q: 'Naționalizarea din 1948 a vizat:', a: ['Trecerea proprietăților private la stat', 'Votul universal', 'Formarea României Mari'], ok: 0, xp: 15, h: 'Leagă anul 1948 de regimul comunist.' },
    { s: 'Istorie', d: 'Greu', c: 'Stat modern', q: 'O constituție este importantă deoarece:', a: ['Stabilește organizarea statului și drepturile', 'Elimină orice conflict', 'Este text literar'], ok: 0, xp: 20, h: 'Gândește instituții, drepturi și puteri în stat.' },
    { s: 'Geografie', d: 'Ușor', c: 'Relief', q: 'Delta Dunării este la vărsarea Dunării în:', a: ['Marea Neagră', 'Marea Mediterană', 'Atlantic'], ok: 0, xp: 10, h: 'Localizează Dunărea pe hartă.' },
    { s: 'Geografie', d: 'Mediu', c: 'Climă', q: 'România are climat majoritar:', a: ['Temperat-continental', 'Ecuatorial', 'Polar'], ok: 0, xp: 15, h: 'Recitește influențele climatice.' },
    { s: 'Geografie', d: 'Greu', c: 'Europa', q: 'Un avantaj al poziției României este:', a: ['Legătura Europa Centrală-Balcani-Marea Neagră', 'Izolarea completă', 'Lipsa vecinilor'], ok: 0, xp: 20, h: 'Gândește rute, vecini și mare.' },
    { s: 'Biologie', d: 'Ușor', c: 'Genetică', q: 'ADN-ul conține informația:', a: ['Genetică', 'Meteorologică', 'Economică'], ok: 0, xp: 10, h: 'ADN-ul este asociat eredității.' },
    { s: 'Biologie', d: 'Mediu', c: 'Mendel', q: 'Raportul 3:1 apare la:', a: ['Monohibridare cu dominanță completă', 'Hărți climatice', 'Derivate'], ok: 0, xp: 15, h: 'Recapitulează legile mendeliene.' },
    { s: 'Chimie', d: 'Ușor', c: 'pH', q: 'pH-ul 7 indică o soluție:', a: ['Neutră', 'Foarte acidă', 'Foarte bazică'], ok: 0, xp: 10, h: 'pH 7 este neutru.' },
    { s: 'Chimie', d: 'Mediu', c: 'Stoichiometrie', q: 'Molul este unitate pentru:', a: ['Cantitatea de substanță', 'Timp', 'Temperatură'], ok: 0, xp: 15, h: 'Stoichiometria folosește moli.' },
    { s: 'Fizică', d: 'Ușor', c: 'Electricitate', q: 'Legea lui Ohm este:', a: ['U = R · I', 'F = m · v', 'E = mgh'], ok: 0, xp: 10, h: 'Leagă tensiunea, rezistența și intensitatea.' },
    { s: 'Fizică', d: 'Mediu', c: 'Mecanică', q: 'Energia cinetică depinde de:', a: ['Masă și viteză', 'Doar temperatură', 'Doar presiune'], ok: 0, xp: 15, h: 'Formula include m și v².' },
    { s: 'Informatică', d: 'Ușor', c: 'Algoritmi', q: 'O variabilă este:', a: ['Un spațiu de memorie cu nume', 'O eroare', 'Un monitor'], ok: 0, xp: 10, h: 'Variabila stochează valori.' },
    { s: 'Informatică', d: 'Mediu', c: 'Complexitate', q: 'Un algoritm O(n) parcurge datele:', a: ['Liniar', 'Fără pași', 'Constant mereu'], ok: 0, xp: 15, h: 'O(n) crește proporțional cu intrarea.' }
  ];
  const achievements = [
    ['first', 'Quiz Starter', 'Primul quiz completat', s => s.quizzes >= 1],
    ['five', 'Minte rapidă', '5 quiz-uri completate', s => s.quizzes >= 5],
    ['ten', '10 corecte la rând', 'Serie de 10 răspunsuri corecte', s => s.best >= 10],
    ['perfect', 'Prima notă de 10', 'Quiz cu scor maxim', s => s.perfect >= 1],
    ['daily7', 'Regele recapitulării', '7 quiz-uri zilnice completate', s => s.daily >= 7],
    ['bac', 'BAC Ready', 'Simulare cu minimum 80%', s => s.bestSim >= 80]
  ];
  function read(key, fallback) { try { return { ...fallback, ...JSON.parse(localStorage.getItem(key) || '{}') }; } catch { return { ...fallback }; } }
  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); return value; }
  function quizState() { return read(stateKey, { quizzes: 0, correct: 0, wrong: 0, cur: 0, best: 0, perfect: 0, daily: 0, lastDaily: '', bestSim: 0, wrongBank: [], unlocked: [] }); }
  function publicState(patch) {
    const base = read(publicKey, { xp: 0, streak: 0, lessons: 0, quizzes: 0, exams: 0, correct: 0, wrong: 0, reports: 0 });
    const next = write(publicKey, { ...base, ...patch });
    ['xp', 'streak', 'lessons', 'quizzes', 'exams', 'correct', 'wrong', 'reports'].forEach(k => { const el = document.getElementById(k); if (el) el.textContent = next[k] || 0; });
    const bar = document.getElementById('levelBar');
    const text = document.getElementById('levelText');
    if (bar) bar.style.width = `${(next.xp || 0) % 100}%`;
    if (text) text.textContent = `Nivel ${Math.floor((next.xp || 0) / 100) + 1} · ${next.xp || 0} XP total`;
    return next;
  }
  function today() { return new Date().toISOString().slice(0, 10); }
  function pick(subject, difficulty, count) {
    let pool = questions.filter(q => (subject === 'Toate' || q.s === subject) && (difficulty === 'Toate' || q.d === difficulty));
    if (!pool.length) pool = questions;
    return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
  }
  function addStyles() {
    if (document.getElementById('quiz-arena-css')) return;
    const style = document.createElement('style');
    style.id = 'quiz-arena-css';
    style.textContent = '.quiz-arena{border:1px solid rgba(60,207,190,.25);background:linear-gradient(180deg,rgba(60,207,190,.08),rgba(13,20,36,.82));border-radius:24px;padding:22px;margin-top:20px}.quiz-toolbar,.quiz-subjects{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.quiz-card,.quiz-ach{border:1px solid var(--line,rgba(255,255,255,.12));background:rgba(255,255,255,.04);border-radius:18px;padding:16px;margin-top:12px}.quiz-options{display:grid;gap:10px;margin-top:12px}.quiz-options button{text-align:left}.quiz-fb{margin-top:12px;padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,.12)}.quiz-fb.ok{color:var(--green,#50c878);border-color:rgba(80,200,120,.35)}.quiz-fb.bad{color:var(--rose,#e86060);border-color:rgba(232,96,96,.35)}.quiz-ach.unlocked{border-color:rgba(228,168,76,.45);background:rgba(228,168,76,.1)}.quiz-bank{padding:10px;border:1px dashed rgba(228,168,76,.35);border-radius:12px;background:rgba(228,168,76,.06);margin:8px 0}@media(max-width:850px){.quiz-toolbar,.quiz-subjects{grid-template-columns:1fr}}';
    document.head.appendChild(style);
  }
  function renderStats(root) {
    const s = quizState();
    const total = s.correct + s.wrong;
    const acc = total ? Math.round((s.correct / total) * 100) : 0;
    root.querySelector('#quiz-stats').innerHTML = `<strong>${s.quizzes}</strong> quiz-uri · <strong>${acc}%</strong> acuratețe · <strong>${s.best}</strong> serie maximă · <strong>${s.daily}</strong> provocări zilnice`;
    const unlocked = new Set(s.unlocked || []);
    let changed = false;
    achievements.forEach(a => { if (a[3](s) && !unlocked.has(a[0])) { unlocked.add(a[0]); changed = true; } });
    if (changed) write(stateKey, { ...s, unlocked: [...unlocked] });
    root.querySelector('#quiz-ach').innerHTML = achievements.map(a => `<div class="quiz-ach ${unlocked.has(a[0]) ? 'unlocked' : ''}"><b>${unlocked.has(a[0]) ? '🏆' : '🔒'} ${a[1]}</b><br><span>${a[2]}</span></div>`).join('');
    root.querySelector('#quiz-bank').innerHTML = (s.wrongBank || []).slice(-5).reverse().map(i => `<div class="quiz-bank"><b>${i.s} · ${i.c}</b><br>${i.q}<br><span>${i.h}</span></div>`).join('') || '<p class="muted">Nu ai încă întrebări salvate pentru recapitulare.</p>';
  }
  function runQuiz(root, list, label) {
    const panel = root.querySelector('#quiz-runner');
    let index = 0;
    let score = 0;
    function draw() {
      const q = list[index];
      panel.innerHTML = `<div class="quiz-card"><span class="badge">${label}</span> <span class="pill">${q.s}</span> <span class="pill">${q.d}</span> <span class="pill">${index + 1}/${list.length}</span><h3>${q.q}</h3><div class="quiz-options">${q.a.map((answer, i) => `<button class="btn" type="button" data-a="${i}">${answer}</button>`).join('')}</div><div class="quiz-fb" hidden></div><div class="actions"><button class="btn teal" id="quiz-next" disabled>${index === list.length - 1 ? 'Finalizează quiz-ul' : 'Următoarea întrebare'}</button></div></div>`;
      let done = false;
      panel.querySelectorAll('[data-a]').forEach(button => button.addEventListener('click', () => {
        if (done) return;
        done = true;
        const ok = Number(button.dataset.a) === q.ok;
        const feedback = panel.querySelector('.quiz-fb');
        const s = quizState();
        const p = read(publicKey, { xp: 0, streak: 0, quizzes: 0, exams: 0, correct: 0, wrong: 0 });
        feedback.hidden = false;
        feedback.className = `quiz-fb ${ok ? 'ok' : 'bad'}`;
        feedback.innerHTML = ok ? `<b>Corect!</b> Ai primit +${q.xp} XP.` : `<b>Greșit.</b> ${q.h}`;
        panel.querySelectorAll('[data-a]').forEach(x => { x.disabled = true; });
        panel.querySelector('#quiz-next').disabled = false;
        if (ok) {
          score += 1;
          s.correct += 1;
          s.cur += 1;
          s.best = Math.max(s.best, s.cur);
          publicState({ xp: (p.xp || 0) + q.xp, correct: (p.correct || 0) + 1, streak: Math.max(p.streak || 0, 1) });
        } else {
          s.wrong += 1;
          s.cur = 0;
          s.wrongBank = [...(s.wrongBank || []), q].slice(-20);
          publicState({ wrong: (p.wrong || 0) + 1, streak: Math.max(p.streak || 0, 1) });
        }
        write(stateKey, s);
        renderStats(root);
      }));
      panel.querySelector('#quiz-next').addEventListener('click', () => index < list.length - 1 ? (index += 1, draw()) : finish());
    }
    function finish() {
      const s = quizState();
      const p = read(publicKey, { quizzes: 0, exams: 0 });
      const percent = Math.round((score / list.length) * 100);
      s.quizzes += 1;
      if (score === list.length) s.perfect += 1;
      if (/zilnic/i.test(label) && s.lastDaily !== today()) { s.daily += 1; s.lastDaily = today(); }
      if (/simulare/i.test(label)) s.bestSim = Math.max(s.bestSim || 0, percent);
      write(stateKey, s);
      publicState({ quizzes: (p.quizzes || 0) + 1, exams: /simulare/i.test(label) ? (p.exams || 0) + 1 : (p.exams || 0) });
      panel.innerHTML = `<div class="quiz-card"><h3>Rezultat: ${score}/${list.length}</h3><p>${percent >= 80 ? 'Excelent! Ești pe direcția bună pentru BAC.' : 'Întrebările greșite au fost salvate la „De repetat”.'}</p><p class="muted">Scor estimativ: ${percent}%</p><button class="btn primary" id="quiz-again">Mai încearcă</button></div>`;
      panel.querySelector('#quiz-again').addEventListener('click', draw);
      renderStats(root);
    }
    draw();
  }
  function mount() {
    if (document.getElementById(rootId)) return;
    addStyles();
    const main = document.querySelector('main') || document.body;
    const anchor = document.getElementById('quiz') || document.getElementById('trasee') || main.firstElementChild;
    const section = document.createElement('section');
    section.id = rootId;
    section.className = 'wrap quiz-arena';
    section.innerHTML = `<span class="badge">Nou · Quiz Arena</span><h2>Quiz-uri pe materii, dificultăți și simulare BAC</h2><p class="muted">Alege materia și dificultatea. Primești feedback imediat, XP, streak, întrebări salvate pentru recapitulare și achievements.</p><div class="quiz-subjects">${['Română', 'Matematică', 'Istorie', 'Geografie', 'Biologie', 'Chimie', 'Fizică', 'Informatică'].map(x => `<div class="quiz-card"><b>${x}</b><br><span>Ușor · Mediu · Greu</span></div>`).join('')}</div><div class="quiz-toolbar"><label>Materie<select id="quiz-sub"><option>Toate</option><option>Română</option><option>Matematică</option><option>Istorie</option><option>Geografie</option><option>Biologie</option><option>Chimie</option><option>Fizică</option><option>Informatică</option></select></label><label>Dificultate<select id="quiz-dif"><option>Toate</option><option>Ușor</option><option>Mediu</option><option>Greu</option></select></label><label>Tip<select id="quiz-mode"><option value="normal">Quiz pe materie</option><option value="daily">Quiz zilnic</option><option value="lesson">Quiz după lecție</option><option value="sim">Simulare BAC</option></select></label><div><button class="btn primary" id="quiz-start" style="margin-top:24px">Pornește quiz-ul</button></div></div><p id="quiz-stats" class="muted"></p><div id="quiz-runner"></div><div class="grid2" style="margin-top:14px"><article class="card"><h3>De repetat</h3><div id="quiz-bank"></div></article><article class="card"><h3>Achievements quiz</h3><div id="quiz-ach" class="quiz-subjects"></div></article></div>`;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(section, anchor.nextSibling); else main.appendChild(section);
    section.querySelector('#quiz-start').addEventListener('click', () => {
      const subject = section.querySelector('#quiz-sub').value;
      const difficulty = section.querySelector('#quiz-dif').value;
      const mode = section.querySelector('#quiz-mode').value;
      const s = quizState();
      if (mode === 'daily') {
        if (s.lastDaily === today()) { section.querySelector('#quiz-runner').innerHTML = '<div class="quiz-card"><h3>Quiz-ul zilnic este deja completat azi.</h3><p>Poți porni un quiz normal.</p></div>'; return; }
        runQuiz(section, pick('Toate', 'Toate', 5), 'Quiz zilnic');
      } else if (mode === 'lesson') runQuiz(section, pick(subject, difficulty, 3), 'Quiz după lecție');
      else if (mode === 'sim') runQuiz(section, pick('Toate', 'Toate', 10), 'Simulare BAC mixtă');
      else runQuiz(section, pick(subject, difficulty, 5), 'Quiz pe materie');
    });
    renderStats(section);
    const lesson = document.getElementById('lectie-romana') || document.querySelector('[id*=lectie]');
    if (lesson && !document.getElementById('auto-lesson-quiz')) {
      const box = document.createElement('div');
      box.id = 'auto-lesson-quiz';
      box.className = 'quiz-card';
      box.innerHTML = '<h3>Verificare automată după lecție</h3><p>Primești 3 întrebări scurte de consolidare.</p><button class="btn teal" type="button">Pornește verificarea</button>';
      lesson.appendChild(box);
      box.querySelector('button').addEventListener('click', () => { location.hash = rootId; setTimeout(() => { section.querySelector('#quiz-mode').value = 'lesson'; section.querySelector('#quiz-sub').value = 'Română'; section.querySelector('#quiz-start').click(); }, 200); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
