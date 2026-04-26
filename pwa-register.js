(() => {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/BACapp/service-worker.js', { scope: '/BACapp/' })
      .catch(error => {
        console.warn('BAC Space service worker registration failed:', error);
      });
  });
})();
