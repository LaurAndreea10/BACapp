(() => {
  const ROOT_ID = 'site-diagnostics';
  const modules = [
    ['Quiz Arena', 'quiz-arena'],
    ['Selector dificultate', 'difficulty-chooser'],
    ['Quiz Pro', 'quiz-pro'],
    ['Panou profesor', 'teacher-dashboard'],
    ['Profil / progres', 'progres'],
    ['BAC Pack', 'bac-pack']
  ];

  function ensureStyles() {
    if (document.getElementById('site-diagnostics-css')) return;
    const style = document.createElement('style');
    style.id = 'site-diagnostics-css';
    style.textContent = `
      .site-diagnostics{border:1px solid rgba(60,207,190,.32);background:linear-gradient(180deg,rgba(60,207,190,.08),rgba(13,20,36,.88));border-radius:24px;padding:22px;margin-top:20px}
      .diagnostics-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.diagnostics-item{border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:12px;background:rgba(255,255,255,.045)}.diagnostics-item.ok{border-color:rgba(80,200,120,.45);background:rgba(80,200,120,.08)}.diagnostics-item.bad{border-color:rgba(232,96,96,.45);background:rgba(232,96,96,.08)}.diagnostics-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}.diagnostics-small{color:var(--muted,#a2acc3);font-size:.92rem;margin-top:8px}@media(max-width:850px){.diagnostics-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function status() {
    return modules.map(([name, id]) => ({ name, id, found: !!document.getElementById(id) }));
  }

  function render(root) {
    const rows = status();
    const loaded = rows.filter(r => r.found).length;
    root.querySelector('#diag-summary').innerHTML = `<strong>${loaded}/${rows.length}</strong> module vizibile în pagină`;
    root.querySelector('#diag-grid').innerHTML = rows.map(r => `<div class="diagnostics-item ${r.found ? 'ok' : 'bad'}"><strong>${r.found ? '✅' : '⚠️'} ${r.name}</strong><br><span>${r.found ? 'vizibil' : 'nu este încă vizibil / posibil cache'}</span></div>`).join('');
    root.querySelector('#diag-info').textContent = `Actualizat: ${new Date().toLocaleString('ro-RO')} · URL: ${location.href}`;
  }

  function mount() {
    if (document.getElementById(ROOT_ID)) return;
    ensureStyles();
    const main = document.querySelector('main') || document.body;
    const anchor = document.getElementById('teacher-dashboard') || document.getElementById('quiz-pro') || document.getElementById('quiz-arena') || main.firstElementChild;
    const root = document.createElement('section');
    root.id = ROOT_ID;
    root.className = 'wrap site-diagnostics';
    root.innerHTML = `
      <span class="badge">Diagnostic</span>
      <h2>Verificare module încărcate</h2>
      <p class="muted">Folosește această zonă când o funcție nouă nu apare. Dacă un modul este marcat cu ⚠️, fă refresh forțat sau așteaptă redeploy-ul GitHub Pages.</p>
      <p id="diag-summary" class="muted"></p>
      <div id="diag-grid" class="diagnostics-grid"></div>
      <div class="diagnostics-actions">
        <button class="btn teal" id="diag-refresh" type="button">Reverifică</button>
        <button class="btn" id="diag-hard-refresh" type="button">Refresh forțat</button>
        <button class="btn" id="diag-clear-state" type="button">Șterge progres local</button>
      </div>
      <p id="diag-info" class="diagnostics-small"></p>
    `;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(root, anchor.nextSibling);
    else main.appendChild(root);
    root.querySelector('#diag-refresh').addEventListener('click', () => render(root));
    root.querySelector('#diag-hard-refresh').addEventListener('click', () => location.reload());
    root.querySelector('#diag-clear-state').addEventListener('click', () => {
      ['bac_public_state', 'bac_quiz_state', 'bac_quiz_pro_state'].forEach(key => localStorage.removeItem(key));
      render(root);
      root.querySelector('#diag-clear-state').textContent = 'Progres șters ✓';
    });
    render(root);
    setInterval(() => render(root), 4000);
  }

  function boot() {
    mount();
    setTimeout(mount, 1000);
    setTimeout(mount, 2500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
