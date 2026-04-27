(() => {
  const ROOT_ID = 'teacher-dashboard';
  const PUBLIC_KEY = 'bac_public_state';
  const QUIZ_KEY = 'bac_quiz_pro_state';
  const ARENA_KEY = 'bac_quiz_state';

  function read(key, fallback) {
    try { return { ...fallback, ...JSON.parse(localStorage.getItem(key) || '{}') }; }
    catch { return { ...fallback }; }
  }

  function ensureStyles() {
    if (document.getElementById('teacher-dashboard-css')) return;
    const style = document.createElement('style');
    style.id = 'teacher-dashboard-css';
    style.textContent = `
      .teacher-dashboard{border:1px solid rgba(80,200,120,.32);background:linear-gradient(180deg,rgba(80,200,120,.08),rgba(13,20,36,.88));border-radius:24px;padding:22px;margin-top:20px}
      .teacher-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.teacher-card{border:1px solid var(--line,rgba(255,255,255,.12));background:rgba(255,255,255,.045);border-radius:18px;padding:16px}.teacher-card strong{display:block;color:var(--gold,#e4a84c);font-size:1.45rem}.teacher-table{width:100%;border-collapse:collapse;margin-top:12px}.teacher-table th,.teacher-table td{border-bottom:1px solid rgba(255,255,255,.1);padding:9px;text-align:left}.teacher-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}.teacher-note{border:1px dashed rgba(228,168,76,.35);background:rgba(228,168,76,.07);border-radius:16px;padding:14px;margin-top:14px}.teacher-print{white-space:pre-wrap;background:rgba(0,0,0,.18);border-radius:14px;padding:12px;max-height:260px;overflow:auto;margin-top:12px}@media(max-width:850px){.teacher-grid{grid-template-columns:1fr}.teacher-table{font-size:.92rem}}
    `;
    document.head.appendChild(style);
  }

  function pct(correct, wrong) {
    const total = (correct || 0) + (wrong || 0);
    return total ? Math.round((correct || 0) / total * 100) : 0;
  }

  function weakChapters(quiz) {
    return Object.entries(quiz.byChapter || {})
      .map(([chapter, v]) => ({ chapter, correct: v.correct || 0, wrong: v.wrong || 0, percent: pct(v.correct, v.wrong) }))
      .sort((a, b) => a.percent - b.percent || b.wrong - a.wrong)
      .slice(0, 5);
  }

  function subjectRows(quiz) {
    const rows = Object.entries(quiz.bySubject || {}).map(([subject, v]) => ({ subject, correct: v.correct || 0, wrong: v.wrong || 0, percent: pct(v.correct, v.wrong) }));
    if (!rows.length) return '<tr><td colspan="4">Nu există încă date suficiente. Rulează un Quiz Pro.</td></tr>';
    return rows.sort((a, b) => a.percent - b.percent).map(r => `<tr><td>${r.subject}</td><td>${r.percent}%</td><td>${r.correct}</td><td>${r.wrong}</td></tr>`).join('');
  }

  function recommendation(publicState, quiz, arena) {
    const weak = weakChapters(quiz);
    if ((publicState.quizzes || 0) === 0 && (quiz.completed || 0) === 0) return 'Începe cu un Quiz Pro pe materia principală, apoi folosește raportul pe capitole.';
    if (weak.length) return `Prioritate: repetă ${weak.slice(0, 3).map(w => `${w.chapter} (${w.percent}%)`).join(', ')}.`;
    if ((arena.daily || 0) < 3) return 'Activează rutina: 3 quiz-uri zilnice în următoarele zile pentru streak și recapitulare.';
    return 'Progres bun. Următorul pas este o simulare BAC mixtă și exportul raportului.';
  }

  function buildReport() {
    const p = read(PUBLIC_KEY, { xp: 0, streak: 0, lessons: 0, quizzes: 0, exams: 0, correct: 0, wrong: 0, reports: 0 });
    const q = read(QUIZ_KEY, { completed: 0, correct: 0, wrong: 0, bestScore: 0, bySubject: {}, byChapter: {}, wrongBank: [] });
    const a = read(ARENA_KEY, { quizzes: 0, daily: 0, best: 0, bestSim: 0 });
    const lines = [];
    lines.push('Panou profesor / evaluator — BAC Space');
    lines.push(`XP: ${p.xp || 0}`);
    lines.push(`Streak: ${p.streak || 0} zile`);
    lines.push(`Lecții: ${p.lessons || 0}`);
    lines.push(`Quiz-uri total: ${(p.quizzes || 0) + (q.completed || 0)}`);
    lines.push(`Simulări: ${p.exams || 0}`);
    lines.push(`Acuratețe globală: ${pct((p.correct || 0) + (q.correct || 0), (p.wrong || 0) + (q.wrong || 0))}%`);
    lines.push(`Cel mai bun scor Quiz Pro: ${q.bestScore || 0}%`);
    lines.push('');
    lines.push('Materii:');
    Object.entries(q.bySubject || {}).forEach(([subject, v]) => lines.push(`- ${subject}: ${pct(v.correct, v.wrong)}% (${v.correct || 0} corecte, ${v.wrong || 0} greșite)`));
    lines.push('');
    lines.push('Capitole slabe:');
    weakChapters(q).forEach(w => lines.push(`- ${w.chapter}: ${w.percent}%`));
    lines.push('');
    lines.push(`Recomandare: ${recommendation(p, q, a)}`);
    return lines.join('\n');
  }

  function render(root) {
    const p = read(PUBLIC_KEY, { xp: 0, streak: 0, lessons: 0, quizzes: 0, exams: 0, correct: 0, wrong: 0, reports: 0 });
    const q = read(QUIZ_KEY, { completed: 0, correct: 0, wrong: 0, bestScore: 0, bySubject: {}, byChapter: {}, wrongBank: [] });
    const a = read(ARENA_KEY, { quizzes: 0, daily: 0, best: 0, bestSim: 0 });
    const globalAcc = pct((p.correct || 0) + (q.correct || 0), (p.wrong || 0) + (q.wrong || 0));
    const weak = weakChapters(q);
    root.querySelector('#teacher-cards').innerHTML = `
      <div class="teacher-card"><strong>${p.xp || 0}</strong>XP total</div>
      <div class="teacher-card"><strong>${globalAcc}%</strong>acuratețe globală</div>
      <div class="teacher-card"><strong>${(p.quizzes || 0) + (q.completed || 0)}</strong>quiz-uri</div>
      <div class="teacher-card"><strong>${q.bestScore || a.bestSim || 0}%</strong>cel mai bun scor</div>
    `;
    root.querySelector('#teacher-subjects').innerHTML = subjectRows(q);
    root.querySelector('#teacher-weak').innerHTML = weak.length ? weak.map(w => `<li>${w.chapter}: <strong>${w.percent}%</strong> (${w.correct} corecte, ${w.wrong} greșite)</li>`).join('') : '<li>Nu există încă date pe capitole.</li>';
    root.querySelector('#teacher-recommendation').textContent = recommendation(p, q, a);
    root.querySelector('#teacher-print').textContent = buildReport();
  }

  function mount() {
    if (document.getElementById(ROOT_ID)) return;
    ensureStyles();
    const main = document.querySelector('main') || document.body;
    const anchor = document.getElementById('quiz-pro') || document.getElementById('quiz-arena') || document.getElementById('progres') || main.firstElementChild;
    const root = document.createElement('section');
    root.id = ROOT_ID;
    root.className = 'wrap teacher-dashboard';
    root.innerHTML = `
      <span class="badge">Nou · Panou profesor</span>
      <h2>Panou profesor / evaluator</h2>
      <p class="muted">Rezumat rapid pentru prezentare: progres, acuratețe, materii slabe, capitole de repetat și recomandarea următoarei sesiuni.</p>
      <div id="teacher-cards" class="teacher-grid"></div>
      <div class="grid2" style="margin-top:14px">
        <article class="card"><h3>Materii</h3><table class="teacher-table"><thead><tr><th>Materie</th><th>Scor</th><th>Corecte</th><th>Greșite</th></tr></thead><tbody id="teacher-subjects"></tbody></table></article>
        <article class="card"><h3>Capitole de repetat</h3><ul id="teacher-weak"></ul></article>
      </div>
      <div class="teacher-note"><strong>Recomandare:</strong> <span id="teacher-recommendation"></span></div>
      <div class="teacher-actions"><button class="btn teal" id="teacher-refresh" type="button">Actualizează panoul</button><button class="btn" id="teacher-copy" type="button">Copiază raport</button><button class="btn" id="teacher-print-btn" type="button">Printează / PDF</button></div>
      <pre id="teacher-print" class="teacher-print"></pre>
    `;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(root, anchor.nextSibling);
    else main.appendChild(root);
    root.querySelector('#teacher-refresh').addEventListener('click', () => render(root));
    root.querySelector('#teacher-copy').addEventListener('click', async () => {
      const text = buildReport();
      try { await navigator.clipboard.writeText(text); root.querySelector('#teacher-copy').textContent = 'Copiat ✓'; }
      catch { root.querySelector('#teacher-copy').textContent = 'Selectează raportul manual'; }
    });
    root.querySelector('#teacher-print-btn').addEventListener('click', () => window.print());
    render(root);
  }

  function boot() {
    mount();
    setTimeout(mount, 900);
    setInterval(() => {
      const root = document.getElementById(ROOT_ID);
      if (root) render(root);
    }, 5000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
