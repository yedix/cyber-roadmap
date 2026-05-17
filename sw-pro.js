const CACHE = 'cyberpath-pro-v1';
const ASSETS = [
  '/cyberpath-pro/',
  '/cyberpath-pro/index.html',
  '/cyberpath-pro/manifest.json',
  '/cyberpath-pro/logo.svg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).catch(() => caches.match('/cyberpath-pro/index.html'))
    )
  );
});
