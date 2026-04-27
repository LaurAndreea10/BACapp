(() => {
  const STORAGE_KEYS = ['bac-state','bacSpace','bac-progress','bacStats','bac-space-a11y-settings','bac-legal-notice-dismissed'];
  const LESSONS = {
    romana: [
      { title: 'Eseu la română', points: ['Introducere: autor, operă, curent/specie.', 'Tema + două scene relevante.', 'Două elemente de construcție: titlu, conflict, perspectivă, personaj, limbaj.', 'Concluzie fără informații noi.'] },
      { title: 'Poezie', points: ['Curent literar și trăsături.', 'Tema exprimată clar.', 'Două imagini poetice explicate.', 'Figuri de stil + efectul lor.'] },
      { title: 'Caracterizare personaj', points: ['Statut social, moral, psihologic.', 'Două scene care demonstrează trăsături.', 'Caracterizare directă și indirectă.', 'Legătura personajului cu tema operei.'] }
    ],
    istorie: [
      { title: 'Eseu istorie', points: ['Respectă cronologia.', 'Folosește cauză → fapt → consecință.', 'Include termeni istorici exacți.', 'Nu amesteca regimuri politice diferite.'] },
      { title: 'Constituții', points: ['1866: monarhie constituțională.', '1923: România Mare și vot universal masculin.', '1938: autoritarism regal.', '1991: democrație postcomunistă.'] },
      { title: 'Comunism', points: ['Instaurare treptată după 1945.', 'Naționalizare, colectivizare, represiune.', 'Control politic și ideologic.', '1989: căderea regimului.'] }
    ],
    geografie: [
      { title: 'Hartă România', points: ['Localizare cardinală.', 'Unitate de relief.', 'Caracteristică fizico-geografică.', 'Exemplu: râu, oraș, masiv, depresiune.'] },
      { title: 'Europa', points: ['Grupează statele pe regiuni.', 'Leagă clima de latitudine și ocean.', 'Conectează relieful cu economia.', 'Folosește exemple concrete.'] },
      { title: 'Climă și relief', points: ['Relief → altitudine → temperatură.', 'Apropiere de mare → umiditate.', 'Latitudine → tip climatic.', 'Exemple regionale.'] }
    ],
    real: [
      { title: 'Matematică: funcții', points: ['Domeniu.', 'Derivată.', 'Semnul derivatei.', 'Tabel de variație.', 'Concluzie.'] },
      { title: 'Biologie: genetică', points: ['Genotipuri părinți.', 'Gameți.', 'Combinații.', 'Raport genotipic și fenotipic.'] },
      { title: 'Chimie: stoichiometrie', points: ['Ecuație echilibrată.', 'Transformare în moli.', 'Raport molar.', 'Rezultat în unitatea cerută.'] },
      { title: 'Fizică: probleme', points: ['Date + unități SI.', 'Formula potrivită.', 'Înlocuire numerică.', 'Verificarea unității.'] }
    ]
  };

  const PROFILES = {
    real: ['Matematică', 'Română', 'Biologie/Chimie/Fizică', 'Simulare mixtă'],
    uman: ['Română', 'Istorie', 'Geografie', 'Argumentare'],
    tehnologic: ['Română', 'Matematică aplicată', 'Competențe tehnice', 'Simulare mixtă'],
    natura: ['Română', 'Matematică/Științe', 'Biologie', 'Chimie/Fizică']
  };

  function qs(sel, root = document) { return root.querySelector(sel); }
  function create(tag, attrs = {}, html = '') {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') el.className = v;
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else el.setAttribute(k, v);
    });
    el.innerHTML = html;
    return el;
  }

  function getMount() {
    return document.querySelector('.mn') || document.querySelector('main') || document.body;
  }

  function renderLessons() {
    return `<div class="bac-pack-grid">${Object.entries(LESSONS).map(([key, items]) => `
      <article class="bac-pack-card">
        <h4>${key === 'real' ? 'Real / științe' : key[0].toUpperCase() + key.slice(1)}</h4>
        ${items.map(item => `<strong>${item.title}</strong><ul>${item.points.map(p => `<li>${p}</li>`).join('')}</ul>`).join('<hr style="border:0;border-top:1px solid var(--line);margin:10px 0">')}
      </article>`).join('')}</div>`;
  }

  function generateSimulation(profile) {
    const subjects = PROFILES[profile] || PROFILES.real;
    return `Profil: ${profile}\n\nStructură recomandată pentru simulare:\n\n${subjects.map((s, i) => `${i + 1}. ${s}: ${i === 0 ? 'subiect complet / eseu' : i === 1 ? 'set de 10-15 cerințe' : 'exerciții aplicate'}`).join('\n')}\n\nTimp recomandat:\n• 10 min: citirea cerințelor\n• 90-120 min: rezolvare\n• 15 min: verificare\n\nRegulă: dacă te blochezi mai mult de 7 minute, marchezi cerința și revii la final.`;
  }

  function makeReport(score, mistakes, profile) {
    const pct = Math.max(0, Math.min(100, Number(score) || 0));
    const err = Math.max(0, Number(mistakes) || 0);
    const level = pct >= 85 ? 'Foarte bine' : pct >= 70 ? 'Bine' : pct >= 50 ? 'În progres' : 'Necesită recapitulare';
    const focus = err >= 8 ? 'refă teoria de bază și întrebările greșite' : err >= 4 ? 'lucrează exerciții similare cu greșelile' : 'menține ritmul și fă o simulare mixtă';
    const subjects = PROFILES[profile] || PROFILES.real;
    return `Raport simulare\n\nScor estimativ: ${pct}%\nNivel: ${level}\nGreșeli notate: ${err}\nProfil: ${profile}\n\nPuncte tari:\n• Ai parcurs o simulare completă sau parțială.\n• Ai date concrete pentru următoarea sesiune.\n\nDe repetat mâine:\n• ${subjects[0]}: 25 minute recapitulare activă.\n• ${subjects[1]}: 10 întrebări scurte.\n• Tema principală: ${focus}.\n\nRecomandare:\n${pct >= 85 ? 'Fă o simulare cronometrată completă și păstrează ritmul.' : pct >= 70 ? 'Consolidează zonele unde ai pierdut puncte și repetă peste 48h.' : pct >= 50 ? 'Reia teoria pe capitole mici, apoi quiz de verificare.' : 'Începe cu lecțiile rapide și construiește baza înainte de simulări complete.'}`;
  }

  function resetProgress() {
    const first = confirm('Sigur vrei să resetezi progresul local? Acțiunea șterge datele salvate în acest browser.');
    if (!first) return;
    const second = confirm('Confirmare finală: progresul, statisticile și preferințele locale vor fi șterse. Continui?');
    if (!second) return;
    STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
    Object.keys(localStorage).forEach(key => {
      if (/bac|quiz|sim|xp|streak|progress/i.test(key)) localStorage.removeItem(key);
    });
    alert('Progresul local a fost resetat. Pagina se va reîncărca.');
    location.reload();
  }

  function renderPanel(active = 'lessons') {
    const panel = qs('#bac-education-pack');
    if (!panel) return;
    panel.querySelectorAll('.bac-pack-tab').forEach(btn => btn.setAttribute('aria-selected', String(btn.dataset.tab === active)));
    const body = qs('.bac-pack-body', panel);
    if (active === 'lessons') {
      body.innerHTML = renderLessons();
    } else if (active === 'simulation') {
      body.innerHTML = `
        <div class="bac-pack-card">
          <h4>Simulare BAC pe profil</h4>
          <div class="bac-pack-form">
            <label class="bac-pack-field">Profil<select id="bac-profile"><option value="real">Real</option><option value="uman">Uman</option><option value="tehnologic">Tehnologic</option><option value="natura">Științe ale naturii</option></select></label>
          </div>
          <div class="bac-pack-actions"><button class="bac-pack-btn primary" id="bac-generate-sim">Generează structură</button></div>
          <div class="bac-pack-output" id="bac-sim-output">Alege profilul și generează o structură de simulare.</div>
        </div>`;
      qs('#bac-generate-sim', panel).addEventListener('click', () => qs('#bac-sim-output', panel).textContent = generateSimulation(qs('#bac-profile', panel).value));
    } else if (active === 'report') {
      body.innerHTML = `
        <div class="bac-pack-card">
          <h4>Raport după simulare</h4>
          <div class="bac-pack-form">
            <label class="bac-pack-field">Scor estimativ %<input id="bac-score" type="number" min="0" max="100" value="70"></label>
            <label class="bac-pack-field">Număr greșeli<input id="bac-mistakes" type="number" min="0" value="5"></label>
            <label class="bac-pack-field">Profil<select id="bac-report-profile"><option value="real">Real</option><option value="uman">Uman</option><option value="tehnologic">Tehnologic</option><option value="natura">Științe ale naturii</option></select></label>
          </div>
          <div class="bac-pack-actions"><button class="bac-pack-btn primary" id="bac-make-report">Generează raport</button></div>
          <div class="bac-pack-output" id="bac-report-output">Completează scorul și greșelile pentru recomandări.</div>
        </div>`;
      qs('#bac-make-report', panel).addEventListener('click', () => qs('#bac-report-output', panel).textContent = makeReport(qs('#bac-score', panel).value, qs('#bac-mistakes', panel).value, qs('#bac-report-profile', panel).value));
    } else if (active === 'reset') {
      body.innerHTML = `
        <div class="bac-pack-card">
          <h4>Reset progres local</h4>
          <p>Șterge datele salvate în browser: progres, statistici, XP, streak și preferințe locale. Nu afectează repository-ul sau GitHub Pages.</p>
          <div class="bac-pack-actions"><button class="bac-pack-btn danger" id="bac-reset-progress">Resetează progresul</button></div>
          <div class="bac-pack-note">Acțiunea cere două confirmări înainte de ștergere.</div>
        </div>`;
      qs('#bac-reset-progress', panel).addEventListener('click', resetProgress);
    }
  }

  function mount() {
    if (qs('#bac-education-pack')) return;
    const mountPoint = getMount();
    const pack = create('section', { id: 'bac-education-pack', class: 'bac-pack', 'aria-label': 'BAC Pack educațional' }, `
      <div class="bac-pack-head">
        <div><div class="bac-pack-title">📚 BAC Pack</div><div class="bac-pack-sub">Lecții rapide, simulare pe profil, raport după simulare și reset progres local.</div></div>
        <div class="bac-pack-badge">Simulator educațional</div>
      </div>
      <div class="bac-pack-tabs" role="tablist">
        <button class="bac-pack-tab" data-tab="lessons" role="tab" aria-selected="true">Lecții rapide</button>
        <button class="bac-pack-tab" data-tab="simulation" role="tab" aria-selected="false">Simulare pe profil</button>
        <button class="bac-pack-tab" data-tab="report" role="tab" aria-selected="false">Raport simulare</button>
        <button class="bac-pack-tab" data-tab="reset" role="tab" aria-selected="false">Reset progres</button>
      </div>
      <div class="bac-pack-body"></div>
    `);
    const firstPanel = mountPoint.querySelector('.pn.act') || mountPoint.firstElementChild;
    if (firstPanel && firstPanel.parentElement) firstPanel.parentElement.insertBefore(pack, firstPanel.nextSibling);
    else mountPoint.prepend(pack);
    pack.querySelectorAll('.bac-pack-tab').forEach(btn => btn.addEventListener('click', () => renderPanel(btn.dataset.tab)));
    renderPanel('lessons');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  setTimeout(mount, 800);
})();
