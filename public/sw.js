// Zorro Merge Cats - Offline PWA Service Worker (Cache-First + Stale-While-Revalidate)
const CACHE_NAME = 'zorro-merge-cats-v1';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/photos/zorro_kitten_paws.png',
  '/cats/zoro_transparent.png',
  '/cats/thor_transparent.png',
  '/cats/loki_transparent.png',
  '/cats/nina_transparent.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Precache asset fetch warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests from the same origin or external fonts/images
  if (req.method !== 'GET') return;

  // Stale-While-Revalidate strategy for app shell and assets
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(req).then((cachedResponse) => {
        const fetchPromise = fetch(req)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(req, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // When offline, cachedResponse will be returned
            return cachedResponse;
          });

        return cachedResponse || fetchPromise;
      });
    })
  );
});
