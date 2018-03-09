// This is based on the First Progressive Web App Tutorial by Google
// https://codelabs.developers.google.com/codelabs/your-first-pwapp/
const cacheName = 'flask-PWA-v4';
const filesToCache = [
    '/',
    '/static/app.js',
    '/static/styles.css',
    '/static/manifest.json',
    '/offline.html'
];

// When the 'install' event is fired we will cache
// the html, javascript, css, images and any other files important
// to the operation of the application shell
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

// We then listen for the service worker to be activated/started. Once it is
// ensures that your service worker updates its cache whenever any of the app shell files change.
// In order for this to work, you'd need to increment the cacheName variable at the top of this service worker file.
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
    e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


// Serve the app shell from the cache
// If the file is not in the cache then try to get it via the network.
// otherwise give an error and display an offline page
// This is a just basic example, a better solution is to use the
// Service Worker Precache module https://github.com/GoogleChromeLabs/sw-precache
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request).catch(error => {
          console.log('Fetch failed; returning offline page instead.', error);
          return caches.match('offline.html');
      });
    })
  );
});