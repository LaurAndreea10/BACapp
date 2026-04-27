(() => {
  const PATHS = [
    {
      id: 'romana', icon: '🇷🇴', title: 'Română', target: 'ro-flow', cta: 'Începe Română',
      text: 'Pentru toți elevii: eseu, poezie, argumentativ, quiz și progres.',
      items: ['Start 7 zile', '3 lecții reale', 'Quiz + XP', 'Eseuri, fișe, glosar']
    },
    {
      id: 'uman', icon: '🏛️', title: 'Uman', target: 'hg-flow', cta: 'Începe Uman',
      text: 'Pentru Istorie + Geografie: cronologie, hartă, climă, Europa și recapitulare.',
      items: ['Plan 7 zile', '3 lecții Istorie', '3 lecții Geografie', 'Quiz + fișe rapide']
    },
    {
      id: 'real', icon: '🔬', title: 'Real / Științe', target: 'ms-flow', cta: 'Începe Real',
      text: 'Pentru Matematică, Biologie, Chimie și Fizică, cu pași de rezolvare.',
      items: ['Plan 7 zile', 'Matematică', 'Bio/Chimie/Fizică', 'Quiz + formule']
    }
  ];

  function scrollToTarget(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    const firstTab = target.querySelector('button, [tabindex], a');
    setTimeout(() => (firstTab || target).focus?.({ preventScroll: true }), 350);
  }

  function mount() {
    if (document.getElementById('learning-paths')) return;
    const root = document.querySelector('.mn') || document.querySelector('main') || document.body;
    const el = document.createElement('section');
    el.id = 'learning-paths';
    el.className = 'learning-paths';
    el.setAttribute('aria-label', 'Alege traseul tău de învățare');
    el.innerHTML = `
      <div class="lp-head">
        <div>
          <div class="lp-title">Alege traseul tău</div>
          <div class="lp-sub">În loc să parcurgi toate modulele deodată, începe cu profilul potrivit. Fiecare traseu are lecții, quiz, XP și progres local.</div>
        </div>
        <div class="lp-badge">Start rapid</div>
      </div>
      <div class="lp-grid">
        ${PATHS.map(path => `
          <article class="lp-card" data-path="${path.id}">
            <h3>${path.icon} ${path.title}</h3>
            <p>${path.text}</p>
            <ul>${path.items.map(item => `<li>${item}</li>`).join('')}</ul>
            <div class="lp-actions">
              <button type="button" class="lp-btn primary" data-scroll-target="${path.target}">${path.cta}</button>
            </div>
          </article>
        `).join('')}
      </div>
      <div class="lp-mini">
        <div><strong>1</strong>Alege profilul</div>
        <div><strong>2</strong>Parcurge lecția</div>
        <div><strong>3</strong>Fă quiz-ul</div>
        <div><strong>4</strong>Urmărește progresul</div>
      </div>
      <div class="lp-tip">Sfat: începe cu un singur traseu pe zi. După ce termini quiz-ul, verifică tabul „Progres”.</div>
    `;

    const anchor = document.getElementById('ro-flow') || document.getElementById('hg-flow') || document.getElementById('ms-flow') || document.getElementById('bac-education-pack') || root.firstElementChild;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(el, anchor);
    else root.prepend(el);

    el.querySelectorAll('[data-scroll-target]').forEach(button => {
      button.addEventListener('click', () => scrollToTarget(button.dataset.scrollTarget));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  setTimeout(mount, 1100);
})();
