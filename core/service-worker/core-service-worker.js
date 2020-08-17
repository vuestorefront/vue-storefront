import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst } from 'workbox-strategies'

precacheAndRoute(self.__WB_MANIFEST || [])

const assetCache = new CacheFirst({
  cacheName: 'vsf-asset'
})

registerRoute(
  '/',
  assetCache
)

registerRoute(
  /\/c\/.*$/,
  new NetworkFirst()
)

registerRoute(
  /\/p\/.*$/,
  new NetworkFirst()
)

registerRoute(
  /\/(dist|assets)\/.+\.(woff|woff2|eot|ttf|json|svg|png|jpg|jpeg|js)$/,
  assetCache
)

registerRoute(
  /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
  assetCache
)

registerRoute(
  /^https:\/\/unpkg\.com\//,
  assetCache
)

registerRoute(
  /^https:\/\/cdn\.jsdelivr\.net\//,
  assetCache
)
