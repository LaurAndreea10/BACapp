(() => {
  const STORAGE_KEY = 'bac-space-a11y-settings';
  const DEFAULTS = {
    highContrast: false,
    largeText: false,
    reducedMotion: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  function loadSettings() {
    try {
      return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
    } catch {
      return { ...DEFAULTS };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  let settings = loadSettings();

  function applySettings() {
    const root = document.documentElement;
    root.classList.toggle('a11y-high-contrast', !!settings.highContrast);
    root.classList.toggle('a11y-large-text', !!settings.largeText);
    root.classList.toggle('a11y-reduced-motion', !!settings.reducedMotion);

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
    setTimeout(() => {
      region.textContent = message;
    }, 20);
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
        <p>Ajustează rapid afișarea pentru citire, contrast și mișcare redusă.</p>
        <div class="a11y-actions">
          <button type="button" data-a11y-toggle="highContrast" aria-pressed="false">Contrast ridicat</button>
          <button type="button" data-a11y-toggle="largeText" aria-pressed="false">Text mărit</button>
          <button type="button" data-a11y-toggle="reducedMotion" aria-pressed="false">Mișcare redusă</button>
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

    panel.querySelector('[data-a11y-reset]').addEventListener('click', () => {
      settings = { ...DEFAULTS, reducedMotion: false };
      saveSettings(settings);
      applySettings();
      announce('Setările de accesibilitate au fost resetate.');
    });
  }

  function observeActiveNav() {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.ni').forEach(item => {
        item.setAttribute('aria-current', item.classList.contains('act') ? 'page' : 'false');
      });
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
    applySettings();
    observeActiveNav();
    setTimeout(improveClickableElements, 500);
    setTimeout(improveClickableElements, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibility);
  } else {
    initAccessibility();
  }
})();
