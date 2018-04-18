/* eslint-disable no-console, no-restricted-globals */

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open('amp-with-pwa').then((cache) => {
    console.log('the cache just opened!');

    return cache.addAll([
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/amp-social-share-0.1.js',
      'https://cdn.ampproject.org/v0/amp-iframe-0.1.js',
      'https://cdn.ampproject.org/v0/amp-carousel-0.1.js',
      'https://cdn.ampproject.org/v0/amp-user-notification-0.1.js',
      'https://cdn.ampproject.org/v0/amp-list-0.1.js',
      'https://cdn.ampproject.org/v0/amp-mustache-0.1.js',
      'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
      'https://fonts.googleapis.com/css?family=Roboto',
      './article',
      './hub',
      './hub/dist/client.js',
      './related_articles.json',
    ]);
  }));
});

self.addEventListener('fetch', (event) => {
  console.log('fetched resource ->', event.request.url);

  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});

self.addEventListener('push', (event) => {
  console.log('a push event was heard!');

  event.waitUntil(self.registration.showNotification(
    'Behold, a push notification!',
    { body: 'how does this appear on your device?' },
  ));
});
