import { openDB } from 'idb'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
console.log('Service Worker wurde installiert! 🎉')


// Cache alle Bilder mit einer Maximalanzahl von 50 für maximal 30 Tage
registerRoute(
  ({request, url}) => request.destination === 'image' || url.origin === 'https://cdn.statically.io' ,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Tage
      }),

    ]
  })
)

// Cache die Antworten von der iTunes-API
registerRoute(
  ({url}) => url.pathname.startsWith('/proxy/'), 
  new StaleWhileRevalidate({
    cacheName: 'itunes-api',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
    ]
  })
)


//Cache alle statischen Resourcen (Scripts/CSS)
registerRoute(
  ({request}) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// Cache Google Fonts stylesheets mit einer stale-while-revalidate Strategie.
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
)

// Cache alle Schriftarten mit einer Cache-First Strategie für 1 Jahr.
registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
)



precacheAndRoute(self.__WB_MANIFEST);

// Fallback on reload
const fallback = createHandlerBoundToURL('/index.html')
registerRoute(new NavigationRoute(fallback))

// Erstelle Datenbank und Object Store 'favorites'
openDB("db1", 2, {
  upgrade(db) {
		db.createObjectStore("favorites");
	}
});