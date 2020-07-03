import { openDB } from 'idb'
console.log('service-worker 🎉')
openDB("db1", 1, {
  upgrade(db) {
		db.createObjectStore("favorites");
	}
});
// import {registerRoute} from 'workbox-routing';
// import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies';

// import {precacheAndRoute} from 'workbox-precaching';

// precacheAndRoute(self.__WB_MANIFEST);

// registerRoute(
//     'https://localhost:8080/charts/api/v1/de/podcasts/top-podcasts/all/10/explicit.json',
//     new StaleWhileRevalidate(),
//   );

// registerRoute(
//     /\.(?:css|js)$/, new CacheFirst()
// )
