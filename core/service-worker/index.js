import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'

import '../modules/offline-order/extends/service-worker.js'
import 'theme/service-worker/index.js'

const assetCache = new CacheFirst({
  cacheName: 'vue-sfr-asset'
})

registerRoute(
  '/',
  assetCache
)

registerRoute(
  /^\/c\/.*/,
  'NetworkFirst'
)

registerRoute(
  /^\/p\/.*/,
  'NetworkFirst'
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
