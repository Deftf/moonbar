// Service worker minimal: cache assets importantes para que la PWA se sienta rápida.
const CACHE_NAME = 'moonbar-v2-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  'assets/icons/moonbar-icon.png',
  'assets/icons/play.webp',
  'assets/icons/pause.png'
  // no agregué todas las imágenes para evitar llenar cache inicial; si quieres añádelas aquí
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
  // limpia caches viejos si se necesita (opcional)
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
