(() => {
  const levels = ['Toate', 'Ușor', 'Mediu', 'Greu'];

  function loadScriptOnce(id, src) {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
  }

  function loadExtraQuizModules() {
    loadScriptOnce('bac-training-engine-loader-fallback', '/BACapp/bac-training-engine.js?v=20260427');
    loadScriptOnce('bac-advanced-features-loader-fallback', '/BACapp/bac-advanced-features.js?v=20260427');
    loadScriptOnce('quiz-superpowers-loader-fallback', '/BACapp/quiz-superpowers.js');
    loadScriptOnce('teacher-dashboard-loader-fallback', '/BACapp/teacher-dashboard.js');
    loadScriptOnce('site-diagnostics-loader-fallback', '/BACapp/site-diagnostics.js');
  }

  function ensureStyles() {
    if (document.getElementById('quiz-difficulty-fix-css')) return;
    const style = document.createElement('style');
    style.id = 'quiz-difficulty-fix-css';
    style.textContent = `
      .difficulty-chooser{margin:18px 0 8px;padding:16px;border:1px solid rgba(228,168,76,.35);border-radius:18px;background:rgba(228,168,76,.07)}
      .difficulty-chooser h3{margin:0 0 8px}.difficulty-buttons{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.difficulty-btn{border:1px solid rgba(255,255,255,.16);border-radius:16px;padding:13px 12px;background:rgba(255,255,255,.05);color:var(--txt,#e8ecf8);font-weight:900;cursor:pointer}.difficulty-btn[aria-pressed="true"]{border-color:rgba(228,168,76,.7);background:linear-gradient(135deg,var(--gold,#e4a84c),#c87c31);color:#080b12}.difficulty-current{margin-top:8px;color:var(--muted,#a2acc3)}
      .training-compat{border:1px solid rgba(60,207,190,.35);background:linear-gradient(180deg,rgba(60,207,190,.1),rgba(13,20,36,.9));border-radius:24px;padding:22px;margin-top:20px}.training-compat-options{display:grid;gap:10px;margin-top:12px}.training-compat-feedback{border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:14px;margin-top:12px}.training-compat-feedback.ok{border-color:rgba(80,200,120,.45);background:rgba(80,200,120,.08)}.training-compat-feedback.bad{border-color:rgba(232,96,96,.45);background:rgba(232,96,96,.08)}
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

  function mountTrainingCompat() {
    if (document.getElementById('training-quiz-engine')) return true;
    if (document.getElementById('training-quiz-compat')) return true;
    const main = document.querySelector('main') || document.body;
    const anchor = document.getElementById('quiz') || document.getElementById('progres') || main.firstElementChild;
    const section = document.createElement('section');
    section.id = 'training-quiz-compat';
    section.className = 'wrap training-compat';
    section.innerHTML = `
      <span class="badge">Motor principal</span>
      <h2>Quiz BAC interactiv</h2>
      <p class="muted">Întrebare → alegere → feedback → explicație → următorul pas.</p>
      <div class="actions"><button class="btn primary" id="compat-start" type="button">Începe quiz-ul de 5 întrebări</button><button class="btn teal" id="compat-weak" type="button">Quiz pe slăbiciuni</button></div>
      <div id="compat-runner"></div>
    `;
    if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(section, anchor.nextSibling); else main.appendChild(section);
    const qs = [
      {q:'Ce trebuie evitat într-un eseu la BAC?',a:['Rezumatul operei','Comentarea scenelor','Folosirea conectorilor','Concluzia clară'],ok:0,e:'La BAC se punctează interpretarea, nu simpla povestire.',t:'Capcana este rezumatul fără analiză.',n:'Repetă fișa: eseu în 6 pași.'},
      {q:'Ce scenă susține tema romanului Ion?',a:['Hora din Pripas','O descriere fără conflict','O replică izolată','Titlul revistei'],ok:0,e:'Hora concentrează ierarhiile satului și anunță conflictul pentru pământ.',t:'Alege scene care arată tema și conflictul.',n:'Fă încă 2 întrebări despre scene semnificative.'},
      {q:'Constituția asociată României Mari este:',a:['1923','1938','1965','1948'],ok:0,e:'Constituția din 1923 consolidează cadrul României Mari.',t:'Nu confunda 1923 cu 1938.',n:'Repetă fișa despre constituții.'},
      {q:'Dacă f(x)=x², atunci f’(x)=',a:['2x','x','2','x²'],ok:0,e:'Se aplică regula (xⁿ)’ = n·xⁿ⁻¹.',t:'Nu uita exponentul coborât în față.',n:'Repetă regulile de derivare.'},
      {q:'O soluție cu pH 7 este:',a:['Neutră','Acidă','Bazică','Oxidantă obligatoriu'],ok:0,e:'pH 7 indică neutralitatea în condiții uzuale.',t:'Nu confunda pH 7 cu acid sau bază slabă.',n:'Repetă scala pH.'}
    ];
    let i=0,score=0,wrong=[];
    function draw(){const x=qs[i];section.querySelector('#compat-runner').innerHTML=`<article class="training-compat"><span class="pill">${i+1}/${qs.length}</span><h3>${x.q}</h3><div class="training-compat-options">${x.a.map((v,k)=>`<button class="btn" type="button" data-k="${k}">${String.fromCharCode(65+k)}. ${v}</button>`).join('')}</div><div id="compat-feedback"></div><div class="actions"><button class="btn teal" id="compat-next" disabled>${i===qs.length-1?'Finalizează':'Următorul pas'}</button></div></article>`;section.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const ok=Number(b.dataset.k)===x.ok;if(ok)score++;else wrong.push(x);section.querySelectorAll('[data-k]').forEach(z=>z.disabled=true);section.querySelector('#compat-feedback').innerHTML=`<div class="training-compat-feedback ${ok?'ok':'bad'}"><strong>${ok?'Corect.':'Aproape, dar nu.'}</strong><p>${x.e}</p><p><strong>Capcană frecventă:</strong> ${x.t}</p><p><strong>Recomandare:</strong> ${x.n}</p></div>`;section.querySelector('#compat-next').disabled=false});section.querySelector('#compat-next').onclick=()=>{if(i<qs.length-1){i++;draw()}else finish()}}
    function finish(){const pct=Math.round(score/qs.length*100);section.querySelector('#compat-runner').innerHTML=`<article class="training-compat"><h3>Raport automat după sesiune</h3><p><strong>Scor:</strong> ${score}/${qs.length} (${pct}%)</p><p>De repetat: ${wrong.length?wrong.map(w=>w.q).join('; '):'menține ritmul.'}</p><div class="share-card" id="compat-share">Am făcut ${score}/${qs.length} la quiz-ul BAC pe BAC Space.</div><div class="actions"><button class="btn primary" id="compat-again">Reia quiz-ul</button><button class="btn teal" id="compat-copy">Copiază rezultat</button></div></article>`;section.querySelector('#compat-again').onclick=()=>{i=0;score=0;wrong=[];draw()};section.querySelector('#compat-copy').onclick=async()=>{try{await navigator.clipboard.writeText(section.querySelector('#compat-share').textContent);section.querySelector('#compat-copy').textContent='Copiat ✓'}catch{}}}
    section.querySelector('#compat-start').onclick=()=>{i=0;score=0;wrong=[];draw()};
    section.querySelector('#compat-weak').onclick=()=>{i=0;score=0;wrong=[];draw()};
    return true;
  }

  function mount() {
    ensureStyles();
    loadExtraQuizModules();
    mountTrainingCompat();
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
    if (toolbar) toolbar.insertAdjacentElement('beforebegin', box); else arena.appendChild(box);
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
    loadExtraQuizModules();
    mountTrainingCompat();
    if (mount()) return;
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      loadExtraQuizModules();
      mountTrainingCompat();
      if (mount() || tries > 30) clearInterval(timer);
    }, 300);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
