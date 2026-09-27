// Mohamed Karouch Portfolio - Service Worker
const CACHE_NAME = 'mk-portfolio-v10';

const PRECACHE_ASSETS = [
    './',
    './index.html',
    './maintenance.html',
    './css/base.css',
    './css/header.css',
    './css/hero.css',
    './css/about-skills-services.css',
    './css/projects-journey.css',
    './css/contact-faq.css',
    './css/modals-tools.css',
    './css/footer.css',
    './css/responsive.css',
    './css/style.css',
    './js/sound-theme.js',
    './js/components.js',
    './js/tools.js',
    './js/main.js',
    './js/script.js',
    './logo/site.webmanifest',
    './logo/favicon.svg',
    './logo/favicon-96x96.png',
    './logo/apple-touch-icon.png',
    './logo/web-app-manifest-192x192.png',
    './logo/web-app-manifest-512x512.png',
    './images/profile-photo.jpg',
    './images/social-preview.jpg'
];

// Install Event: Pre-cache critical core shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS).catch((err) => {
                console.warn('Pre-cache partial failure:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// Activate Event: Clear outdated caches immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event: Network-First with Cache Fallback (Never serves stale updates when online)
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) return cachedResponse;
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});
