(() => {
  const levels = ['Toate', 'Ușor', 'Mediu', 'Greu'];

  function ensureStyles() {
    if (document.getElementById('quiz-difficulty-fix-css')) return;
    const style = document.createElement('style');
    style.id = 'quiz-difficulty-fix-css';
    style.textContent = `
      .difficulty-chooser {
        margin: 18px 0 8px;
        padding: 16px;
        border: 1px solid rgba(228,168,76,.35);
        border-radius: 18px;
        background: rgba(228,168,76,.07);
      }
      .difficulty-chooser h3 {
        margin: 0 0 8px;
      }
      .difficulty-buttons {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
      }
      .difficulty-btn {
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 16px;
        padding: 13px 12px;
        background: rgba(255,255,255,.05);
        color: var(--txt,#e8ecf8);
        font-weight: 900;
        cursor: pointer;
      }
      .difficulty-btn[aria-pressed="true"] {
        border-color: rgba(228,168,76,.7);
        background: linear-gradient(135deg,var(--gold,#e4a84c),#c87c31);
        color: #080b12;
      }
      .difficulty-current {
        margin-top: 8px;
        color: var(--muted,#a2acc3);
      }
      @media(max-width:850px){.difficulty-buttons{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(style);
  }

  function syncButtons(box, value) {
    box.querySelectorAll('.difficulty-btn').forEach(button => {
      button.setAttribute('aria-pressed', button.dataset.difficulty === value ? 'true' : 'false');
    });
    const current = box.querySelector('.difficulty-current strong');
    if (current) current.textContent = value;
  }

  function mount() {
    ensureStyles();
    const arena = document.getElementById('quiz-arena');
    const select = document.getElementById('quiz-dif');
    if (!arena || !select || document.getElementById('difficulty-chooser')) return false;

    const box = document.createElement('div');
    box.id = 'difficulty-chooser';
    box.className = 'difficulty-chooser';
    box.innerHTML = `
      <h3>Alege dificultatea</h3>
      <div class="difficulty-buttons" role="group" aria-label="Dificultate quiz">
        ${levels.map(level => `<button class="difficulty-btn" type="button" data-difficulty="${level}" aria-pressed="false">${level}</button>`).join('')}
      </div>
      <p class="difficulty-current">Dificultate selectată: <strong>${select.value || 'Toate'}</strong></p>
    `;

    const toolbar = arena.querySelector('.quiz-toolbar');
    if (toolbar) toolbar.insertAdjacentElement('beforebegin', box);
    else arena.appendChild(box);

    box.querySelectorAll('.difficulty-btn').forEach(button => {
      button.addEventListener('click', () => {
        select.value = button.dataset.difficulty;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        syncButtons(box, select.value);
      });
    });

    select.addEventListener('change', () => syncButtons(box, select.value));
    syncButtons(box, select.value || 'Toate');
    return true;
  }

  function boot() {
    if (mount()) return;
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (mount() || tries > 30) clearInterval(timer);
    }, 300);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
