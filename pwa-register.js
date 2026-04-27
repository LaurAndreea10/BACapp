(() => {
  function loadAccessibilityAssets() {
    if (!document.querySelector('link[href="/BACapp/accessibility.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/BACapp/accessibility.css';
      document.head.appendChild(link);
    }

    if (!document.querySelector('script[src="/BACapp/accessibility.js"]')) {
      const script = document.createElement('script');
      script.src = '/BACapp/accessibility.js';
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  loadAccessibilityAssets();

  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/BACapp/service-worker.js', { scope: '/BACapp/' })
      .catch(error => {
        console.warn('BAC Space service worker registration failed:', error);
      });
  });
})();
