(() => {
  function scrollTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }

  function loadScriptOnce(id, src) {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
  }

  function loadQuizModules() {
    loadScriptOnce('quiz-arena-loader', '/BACapp/quiz-arena.js');
    loadScriptOnce('quiz-difficulty-fix-loader', '/BACapp/quiz-difficulty-fix.js');
    loadScriptOnce('quiz-superpowers-loader', '/BACapp/quiz-superpowers.js');
    loadScriptOnce('teacher-dashboard-loader', '/BACapp/teacher-dashboard.js');
  }

  function addLandingSummary() {
    if (document.getElementById('public-ready-summary')) return;
    const root = document.querySelector('.mn') || document.querySelector('main') || document.body;
    const anchor = document.getElementById('learning-paths') || root.querySelector('.pn.act') || root.firstElementChild;
    const box = document.createElement('section');
    box.id = 'public-ready-summary';
    box.className = 'public-ready';
    box.setAttribute('aria-label', 'Rezumat funcțional BAC Space');
    box.innerHTML = `
      <h3>Începe pregătirea BAC</h3>
      <p>Aplicația include fluxuri complete cu lecții reale, quiz, XP și progres local. Pentru o experiență cap-coadă, alege unul dintre traseele de mai jos.</p>
      <div class="public-ready-grid">
        <div class="public-ready-card"><strong>🇷🇴 Română</strong><span>Eseu, poezie, argumentativ, quiz și glosar.</span></div>
        <div class="public-ready-card"><strong>🏛️ Uman</strong><span>Istorie + Geografie cu plan de 7 zile și quiz.</span></div>
        <div class="public-ready-card"><strong>🔬 Real / Științe</strong><span>Matematică, Biologie, Chimie și Fizică pe pași.</span></div>
        <div class="public-ready-card"><strong>❓ Quiz Arena</strong><span>Materii, dificultăți, quiz zilnic, simulare BAC, XP și achievements.</span></div>
        <div class="public-ready-card"><strong>🚀 Quiz Pro</strong><span>Capitole, explicații, rapoarte, repetare greșeli, export și badge-uri.</span></div>
        <div class="public-ready-card"><strong>👩‍🏫 Panou profesor</strong><span>Rezumat pentru evaluator: scoruri, capitole slabe și recomandări.</span></div>
      </div>
      <div class="public-ready-actions">
        <button type="button" data-target="learning-paths">Alege traseul</button>
        <button type="button" data-target="quiz-arena">Quiz Arena</button>
        <button type="button" data-target="quiz-pro">Quiz Pro</button>
        <button type="button" data-target="teacher-dashboard">Panou profesor</button>
        <button type="button" data-target="bac-education-pack">Deschide BAC Pack</button>
        <button type="button" data-target="ai-coach-local-suggestions">Întrebări AI Coach</button>
      </div>
    `;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(box, anchor);
    else root.prepend(box);
    box.querySelectorAll('[data-target]').forEach(button => button.addEventListener('click', () => scrollTo(button.dataset.target)));
  }

  function addAINotes() {
    const text = '<strong>Notă:</strong> feedbackul AI/corectarea/generatorul sunt orientative și nu înlocuiesc baremul oficial sau evaluarea profesorului.';
    const candidates = Array.from(document.querySelectorAll('.pn, section, .cd, .card')).filter(el => /AI|Coach|Corectare|Generator subiecte|Simulare BAC/i.test(el.textContent || ''));
    candidates.slice(0, 4).forEach((el, index) => {
      if (el.querySelector('.ai-orientation-note')) return;
      const note = document.createElement('div');
      note.className = 'ai-orientation-note';
      note.innerHTML = text;
      const header = el.querySelector('h2,h3,.hd,.ct') || el.firstElementChild;
      if (header && header.parentElement === el) header.insertAdjacentElement('afterend', note);
      else if (index === 0) el.prepend(note);
    });
  }

  function addEmptyStateHints() {
    const phrases = ['Alege o lecție', 'Selectează materia', 'Nicio activitate încă', 'Apasă Generează'];
    const nodes = Array.from(document.querySelectorAll('p,div,span')).filter(node => phrases.some(phrase => (node.textContent || '').includes(phrase)));
    nodes.slice(0, 8).forEach(node => {
      if (node.nextElementSibling?.classList?.contains('empty-state-upgrade')) return;
      const hint = document.createElement('div');
      hint.className = 'empty-state-upgrade';
      hint.textContent = 'Pentru o demonstrație completă, folosește traseele Română, Uman sau Real/Științe: lecție → quiz → XP → progres.';
      node.insertAdjacentElement('afterend', hint);
    });
  }

  function run() {
    addLandingSummary();
    addAINotes();
    addEmptyStateHints();
    loadQuizModules();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  setTimeout(run, 900);
  setTimeout(run, 1800);
})();
