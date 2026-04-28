(() => {
  const KEY = 'bac_launch_feedback';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
  const write = v => localStorage.setItem(KEY, JSON.stringify(v));

  function style() {
    if (document.getElementById('launch-readiness-css')) return;
    const s = document.createElement('style');
    s.id = 'launch-readiness-css';
    s.textContent = `
      .launch-ready{border:1px solid rgba(80,200,120,.35);background:linear-gradient(180deg,rgba(80,200,120,.08),rgba(13,20,36,.9));border-radius:24px;padding:22px;margin-top:20px}.launch-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.launch-card{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.045);border-radius:18px;padding:16px}.launch-card strong{color:var(--gold,#e4a84c)}.launch-note{border:1px dashed rgba(228,168,76,.4);background:rgba(228,168,76,.07);border-radius:16px;padding:14px;margin-top:12px}.feedback-list{display:grid;gap:10px;margin-top:10px}.feedback-item{border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:10px;background:rgba(255,255,255,.035)}
      @media(max-width:850px){.launch-grid{grid-template-columns:1fr}.launch-ready{padding:18px}.launch-card{padding:14px}.hero h1{font-size:clamp(2rem,11vw,3.4rem)}.actions .btn{width:100%;text-align:center}.nav nav{display:flex;flex-wrap:wrap;gap:8px}.nav nav a{padding:6px 0}.grid,.grid2,.grid3,.grid4{gap:12px}section{padding:20px 0}}
    `;
    document.head.appendChild(s);
  }

  function cleanCopy() {
    document.querySelectorAll('body *').forEach(el => {
      if (!el.childElementCount && el.textContent) {
        el.textContent = el.textContent
          .replace(/BAC Space Premium/g, 'BAC Space')
          .replace(/Aplicația completă/g, 'Instrumente BAC')
          .replace(/Zona de mai jos readuce modulele din versiunea anterioară[^.]*\./g, '');
      }
    });
    const brand = document.querySelector('.brand');
    if (brand) brand.textContent = 'BAC Space · Simulator BAC';
  }

  function guardQuizButtons() {
    document.addEventListener('click', event => {
      const btn = event.target.closest('button,a');
      if (!btn) return;
      const text = (btn.textContent || '').toLowerCase();
      if (/quiz|simulare|generează|raport|start|începe/.test(text)) {
        setTimeout(() => {
          const broken = [...document.querySelectorAll('button')].filter(b => /undefined|null|nan/i.test(b.textContent || ''));
          broken.forEach(b => { b.textContent = 'Continuă'; });
        }, 120);
      }
    }, true);
  }

  function section() {
    if (document.getElementById('launch-readiness')) return;
    const sec = document.createElement('section');
    sec.id = 'launch-readiness';
    sec.className = 'wrap launch-ready';
    sec.innerHTML = `
      <span class="badge">Calitate & încredere</span>
      <h2>Gata de folosit responsabil</h2>
      <div class="launch-grid">
        <article class="launch-card"><strong>Conținut verificabil</strong><p>Exemplele sunt educaționale și orientative. Pentru variante oficiale și bareme, elevul este trimis la surse oficiale.</p></article>
        <article class="launch-card"><strong>Design mobil curat</strong><p>Buton principal full-width pe mobil, carduri aerisite și meniu orientat pe acțiune.</p></article>
        <article class="launch-card"><strong>Onboarding simplu</strong><p>Profil, țintă și prima acțiune: diagnostic sau quiz rapid.</p></article>
        <article class="launch-card"><strong>Privacy clar</strong><p>Progresul este salvat local în browser. Nu este necesar cont pentru MVP.</p></article>
        <article class="launch-card"><strong>Disclaimer vizibil</strong><p>BAC Space este simulator educațional independent, nu aplicație oficială.</p></article>
        <article class="launch-card"><strong>Stabilitate quiz/simulări</strong><p>Există protecții pentru afișări invalide și fallback pentru modulele interactive.</p></article>
      </div>
      <div class="launch-note"><strong>Important:</strong> rezultatele, scorurile și feedbackul sunt orientative. Pentru examen contează programa, profesorul și baremul oficial.</div>
      <article class="launch-card" style="margin-top:14px">
        <h3>Feedback elevi/profesori</h3>
        <p class="muted">Salvat local pentru testare MVP. Poate fi copiat și trimis manual.</p>
        <label>Rol<select id="fb-role"><option>Elev</option><option>Profesor</option><option>Părinte</option></select></label>
        <label>Feedback<input id="fb-text" placeholder="Ce ar trebui îmbunătățit?"></label>
        <div class="actions"><button class="btn teal" id="fb-save" type="button">Salvează feedback</button><button class="btn" id="fb-copy" type="button">Copiază feedbackul</button></div>
        <div id="fb-list" class="feedback-list"></div>
      </article>
    `;
    const anchor = document.getElementById('seo-faq') || document.getElementById('advanced-seo-info') || document.getElementById('coach') || document.querySelector('main')?.lastElementChild;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(sec, anchor.nextSibling);
    else (document.querySelector('main') || document.body).appendChild(sec);
    sec.querySelector('#fb-save').onclick = () => {
      const role = sec.querySelector('#fb-role').value;
      const text = sec.querySelector('#fb-text').value.trim();
      if (!text) return;
      const all = [...read(), { role, text, date: new Date().toISOString().slice(0, 10) }].slice(-30);
      write(all);
      sec.querySelector('#fb-text').value = '';
      renderFeedback(sec);
    };
    sec.querySelector('#fb-copy').onclick = async () => {
      const payload = read().map(x => `${x.date} · ${x.role}: ${x.text}`).join('\n') || 'Nu există feedback salvat.';
      try { await navigator.clipboard.writeText(payload); sec.querySelector('#fb-copy').textContent = 'Copiat ✓'; }
      catch { sec.querySelector('#fb-copy').textContent = 'Selectează manual'; }
    };
    renderFeedback(sec);
  }

  function renderFeedback(root) {
    const list = root.querySelector('#fb-list');
    if (!list) return;
    const items = read();
    list.innerHTML = items.length ? items.slice(-5).reverse().map(x => `<div class="feedback-item"><strong>${x.role}</strong> · ${x.date}<br>${x.text.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</div>`).join('') : '<p class="muted">Încă nu există feedback salvat.</p>';
  }

  function init() {
    style();
    cleanCopy();
    section();
    guardQuizButtons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  setTimeout(init, 900);
})();
