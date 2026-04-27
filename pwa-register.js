(() => {
  function loadScriptOnce(src, defer = true) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = defer;
    document.head.appendChild(script);
  }

  function loadStyleOnce(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function loadRuntimeAssets() {
    loadStyleOnce('/BACapp/accessibility.css');
    loadStyleOnce('/BACapp/education-pack.css');
    loadStyleOnce('/BACapp/romanian-flow.css');
    loadStyleOnce('/BACapp/history-geography-flow.css');
    loadStyleOnce('/BACapp/math-science-flow.css');
    loadStyleOnce('/BACapp/learning-paths.css');
    loadScriptOnce('/BACapp/accessibility.js');
    loadScriptOnce('/BACapp/ai-coach-extra-presets.js');
    loadScriptOnce('/BACapp/legal-notice.js');
    loadScriptOnce('/BACapp/education-pack.js');
    loadScriptOnce('/BACapp/romanian-flow.js');
    loadScriptOnce('/BACapp/history-geography-flow.js');
    loadScriptOnce('/BACapp/math-science-flow.js');
    loadScriptOnce('/BACapp/learning-paths.js');
  }

  loadRuntimeAssets();

  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/BACapp/service-worker.js', { scope: '/BACapp/' })
      .catch(error => {
        console.warn('BAC Space service worker registration failed:', error);
      });
  });
})();
