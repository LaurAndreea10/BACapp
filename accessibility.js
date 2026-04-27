(() => {
  const STORAGE_KEY = 'bac-space-a11y-settings';
  const DEFAULTS = {
    highContrast: false,
    largeText: false,
    reducedMotion: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    easyRead: false,
    distractionFree: false
  };

  function loadSettings() {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
    catch { return { ...DEFAULTS }; }
  }

  function saveSettings(settings) { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); }
  let settings = loadSettings();
  let currentUtterance = null;

  function applySettings() {
    const root = document.documentElement;
    root.classList.toggle('a11y-high-contrast', !!settings.highContrast);
    root.classList.toggle('a11y-large-text', !!settings.largeText);
    root.classList.toggle('a11y-reduced-motion', !!settings.reducedMotion);
    root.classList.toggle('a11y-easy-read', !!settings.easyRead);
    root.classList.toggle('a11y-distraction-free', !!settings.distractionFree);
    document.querySelectorAll('[data-a11y-toggle]').forEach(button => {
      const key = button.getAttribute('data-a11y-toggle');
      button.setAttribute('aria-pressed', String(!!settings[key]));
    });
  }

  function ensureA11yAssets() {
    if (!document.querySelector('link[href="/BACapp/accessibility.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/BACapp/accessibility.css';
      document.head.appendChild(link);
    }
  }

  function addSkipLink() {
    if (document.querySelector('.skip-link')) return;
    const link = document.createElement('a');
    link.href = '#main-content';
    link.className = 'skip-link';
    link.textContent = 'Sari la conținut';
    document.body.prepend(link);
  }

  function markMainContent() {
    const main = document.querySelector('main') || document.querySelector('.mn');
    if (!main) return;
    if (!main.id) main.id = 'main-content';
    main.setAttribute('role', 'main');
    main.setAttribute('tabindex', '-1');
  }

  function improveLandmarksAndLabels() {
    const sidebar = document.querySelector('.sb');
    if (sidebar) sidebar.setAttribute('aria-label', 'Navigare principală');
    const nav = document.querySelector('.sb-nav');
    if (nav) nav.setAttribute('role', 'navigation');
    const title = document.getElementById('ttl');
    if (title) title.setAttribute('aria-live', 'polite');

    document.querySelectorAll('.pn').forEach(panel => {
      panel.setAttribute('role', 'region');
      const heading = panel.querySelector('h2, .hd h2, .ct');
      if (heading && !panel.getAttribute('aria-label')) panel.setAttribute('aria-label', heading.textContent.trim());
    });

    document.querySelectorAll('#qa, .qo').forEach(element => element.setAttribute('aria-live', 'polite'));
    document.querySelectorAll('.am').forEach(chat => {
      chat.setAttribute('role', 'log');
      chat.setAttribute('aria-live', 'polite');
      chat.setAttribute('aria-label', 'Conversație AI Coach');
    });
    document.querySelectorAll('.mc').forEach(map => {
      map.setAttribute('role', 'application');
      map.setAttribute('aria-label', 'Hartă interactivă. Folosește controalele hărții pentru navigare.');
    });
  }

  function improveClickableElements() {
    document.querySelectorAll('[onclick]:not(button):not(a):not(input):not(textarea):not(select)').forEach(element => {
      if (!element.hasAttribute('role')) element.setAttribute('role', 'button');
      if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '0');
      if (!element.hasAttribute('aria-label')) {
        const label = element.textContent.trim().replace(/\s+/g, ' ');
        if (label) element.setAttribute('aria-label', label);
      }
    });

    document.querySelectorAll('.ni').forEach(item => {
      item.setAttribute('role', 'button');
      if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');
      item.setAttribute('aria-current', item.classList.contains('act') ? 'page' : 'false');
    });

    document.querySelectorAll('.bt, .ib, .hm, .strk, .ai-suggestion').forEach(button => {
      if (!button.hasAttribute('type') && button.tagName === 'BUTTON') button.type = 'button';
    });
    improveLandmarksAndLabels();
  }

  function addKeyboardActivation() {
    document.addEventListener('keydown', event => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const isButtonLike = target.matches('[role="button"], .ni, .sc, .ch, .gt, .essay-model, .ai-suggestion');
      if (!isButtonLike) return;
      if (event.key !== 'Enter' && event.key !== ' ') return;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') return;
      event.preventDefault();
      target.click();
    });
  }

  function addLiveRegion() {
    if (document.getElementById('a11y-live-region')) return;
    const region = document.createElement('div');
    region.id = 'a11y-live-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.style.position = 'absolute';
    region.style.width = '1px';
    region.style.height = '1px';
    region.style.overflow = 'hidden';
    region.style.clip = 'rect(1px, 1px, 1px, 1px)';
    region.style.whiteSpace = 'nowrap';
    document.body.appendChild(region);
  }

  function announce(message) {
    const region = document.getElementById('a11y-live-region');
    if (!region) return;
    region.textContent = '';
    setTimeout(() => { region.textContent = message; }, 20);
  }

  function getReadableText() {
    const activePanel = document.querySelector('.pn.act') || document.querySelector('main') || document.body;
    const clone = activePanel.cloneNode(true);
    clone.querySelectorAll('script, style, button, input, textarea, select, .a11y-panel, .a11y-speak-controls').forEach(node => node.remove());
    return clone.textContent.replace(/\s+/g, ' ').trim().slice(0, 4500);
  }

  function speakCurrentContent() {
    if (!('speechSynthesis' in window)) {
      announce('Citirea vocală nu este disponibilă în acest browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const text = getReadableText();
    if (!text) {
      announce('Nu există text de citit în secțiunea curentă.');
      return;
    }
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'ro-RO';
    currentUtterance.rate = 0.92;
    currentUtterance.pitch = 1;
    window.speechSynthesis.speak(currentUtterance);
    announce('Citirea textului a început.');
  }

  function stopSpeaking() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    currentUtterance = null;
    announce('Citirea textului a fost oprită.');
  }

  function addSpeakControls() {
    const main = document.querySelector('main') || document.querySelector('.mn');
    if (!main || document.getElementById('a11y-speak-controls')) return;
    const controls = document.createElement('div');
    controls.id = 'a11y-speak-controls';
    controls.className = 'a11y-speak-controls';
    controls.innerHTML = `
      <button type="button" class="a11y-speak-button" data-a11y-speak>🔊 Citește textul</button>
      <button type="button" class="a11y-speak-button" data-a11y-stop>⏹ Oprește</button>
    `;
    const toolbar = main.querySelector('.tb');
    if (toolbar && toolbar.parentElement) toolbar.parentElement.insertBefore(controls, toolbar.nextSibling);
    else main.prepend(controls);
    controls.querySelector('[data-a11y-speak]').addEventListener('click', speakCurrentContent);
    controls.querySelector('[data-a11y-stop]').addEventListener('click', stopSpeaking);
  }

  function createPanel() {
    if (document.getElementById('a11y-panel')) return;
    const panel = document.createElement('section');
    panel.id = 'a11y-panel';
    panel.className = 'a11y-panel';
    panel.setAttribute('aria-label', 'Setări accesibilitate');
    panel.innerHTML = `
      <div class="a11y-menu" id="a11y-menu" role="dialog" aria-label="Setări accesibilitate">
        <div class="a11y-menu-title">Accesibilitate</div>
        <p>Ajustează rapid afișarea, citirea, contrastul și nivelul de distragere.</p>
        <div class="a11y-actions">
          <button type="button" data-a11y-toggle="highContrast" aria-pressed="false">Contrast ridicat</button>
          <button type="button" data-a11y-toggle="largeText" aria-pressed="false">Text mărit</button>
          <button type="button" data-a11y-toggle="easyRead" aria-pressed="false">Citire ușoară</button>
          <button type="button" data-a11y-toggle="distractionFree" aria-pressed="false">Fără distrageri</button>
          <button type="button" data-a11y-toggle="reducedMotion" aria-pressed="false">Mișcare redusă</button>
          <button type="button" data-a11y-speak-panel>🔊 Citește</button>
          <button type="button" data-a11y-stop-panel>⏹ Oprește</button>
          <button type="button" data-a11y-reset>Reset</button>
        </div>
      </div>
      <button type="button" class="a11y-toggle" aria-controls="a11y-menu" aria-expanded="false" aria-label="Deschide setările de accesibilitate">♿</button>
    `;
    document.body.appendChild(panel);

    const toggle = panel.querySelector('.a11y-toggle');
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      announce(open ? 'Setările de accesibilitate sunt deschise.' : 'Setările de accesibilitate sunt închise.');
    });

    panel.querySelectorAll('[data-a11y-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const key = button.getAttribute('data-a11y-toggle');
        settings[key] = !settings[key];
        saveSettings(settings);
        applySettings();
        announce(`${button.textContent} ${settings[key] ? 'activat' : 'dezactivat'}.`);
      });
    });

    panel.querySelector('[data-a11y-speak-panel]').addEventListener('click', speakCurrentContent);
    panel.querySelector('[data-a11y-stop-panel]').addEventListener('click', stopSpeaking);
    panel.querySelector('[data-a11y-reset]').addEventListener('click', () => {
      settings = { ...DEFAULTS, reducedMotion: false, easyRead: false, distractionFree: false };
      saveSettings(settings);
      applySettings();
      stopSpeaking();
      announce('Setările de accesibilitate au fost resetate.');
    });
  }

  function observeActiveNav() {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.ni').forEach(item => {
        item.setAttribute('aria-current', item.classList.contains('act') ? 'page' : 'false');
      });
      improveLandmarksAndLabels();
    });
    const nav = document.querySelector('.sb-nav') || document.body;
    observer.observe(nav, { subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  function initAccessibility() {
    ensureA11yAssets();
    addSkipLink();
    markMainContent();
    improveClickableElements();
    addKeyboardActivation();
    addLiveRegion();
    createPanel();
    addSpeakControls();
    applySettings();
    observeActiveNav();
    setTimeout(improveClickableElements, 500);
    setTimeout(addSpeakControls, 500);
    setTimeout(improveClickableElements, 1500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAccessibility);
  else initAccessibility();
})();
