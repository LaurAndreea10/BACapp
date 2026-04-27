const CACHE_VERSION = 'bac-space-v5-quality-mobile-content';
const APP_SCOPE = '/BACapp/';
const APP_SHELL = [
  APP_SCOPE,
  `${APP_SCOPE}index.html`,
  `${APP_SCOPE}offline.html`,
  `${APP_SCOPE}404.html`,
  `${APP_SCOPE}manifest.webmanifest`,
  `${APP_SCOPE}styles.css`,
  `${APP_SCOPE}accessibility.css`,
  `${APP_SCOPE}accessibility.js`,
  `${APP_SCOPE}ai-coach-presets.js`,
  `${APP_SCOPE}ai-coach-extra-presets.js`,
  `${APP_SCOPE}pwa-register.js`,
  `${APP_SCOPE}icons/icon-192.svg`,
  `${APP_SCOPE}icons/icon-512.svg`,
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isLocalAsset = url.pathname.startsWith(APP_SCOPE) && /\.(?:js|css|webmanifest)$/.test(url.pathname);

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match(`${APP_SCOPE}offline.html`)))
    );
    return;
  }

  if (isLocalAsset) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const networkFetch = fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
