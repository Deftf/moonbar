const CACHE_NAME = 'moonbar-v2-cache-v2';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  'assets/icons/moonbar-icon.png',
  'assets/icons/play.webp',
  'assets/icons/pause.png'
];

// Instala solo lo básico
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Limpieza de caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

// Estrategia: network-first para imágenes
self.addEventListener('fetch', event => {
  const req = event.request;

  // Si es imagen, usa "network first"
  if (req.destination === 'image') {
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }

  // Para demás: cache-first
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
