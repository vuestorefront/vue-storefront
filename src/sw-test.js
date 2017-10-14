'use strict'

const OFFLINE_CACHE = 'cache'
// listen for outgoing network request
self.addEventListener('fetch', (event) => {
  // try to find response object in the cache
  // associated with current request
  event.respondWith(caches.match(event.request)
    .then((cachedResponse) => {
      // if there's cached response, give it back
      if (cachedResponse) {
        return cachedResponse
      }
      // if no, try to fetch it from the network
      return fetch(event.request.clone())
        .then((networkResponse) => {
          // if response is “bad”,
          // just pass it back into the app
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse
          }

          // if response is ok, cache it and
          // give it back into the app
          caches.open(OFFLINE_CACHE)
            .then((cache) => cache.put(
              event.request, networkResponse))

          return networkResponse
        })
    }))
})
