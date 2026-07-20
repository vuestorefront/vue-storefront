const fs = require('fs')
const path = require('path')
const { generateSW } = require('workbox-build')

const rootPath = path.resolve(__dirname, '../..')
const cacheVersion = fs.readFileSync(path.join(__dirname, 'cache-version.json'), 'utf8')

generateSW({
  cacheId: 'vue-sfr',
  cleanupOutdatedCaches: true,
  clientsClaim: false,
  skipWaiting: true,
  inlineWorkboxRuntime: true,
  swDest: path.join(rootPath, 'dist/client/service-worker.js'),
  globDirectory: rootPath,
  globPatterns: [
    'dist/client/**/*.{js,css,json}'
  ],
  globIgnores: [
    'dist/client/service-worker.js',
    'dist/client/**/*.map'
  ],
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
  modifyURLPrefix: {
    'dist/client/': '/dist/'
  },
  additionalManifestEntries: [
    { url: '/', revision: cacheVersion }
  ],
  importScripts: ['/dist/core-service-worker.js'],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-font-stylesheets'
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-font-files',
        cacheableResponse: { statuses: [0, 200] },
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }
      }
    },
    {
      urlPattern: ({ request }) => ['audio', 'video'].includes(request.destination),
      handler: 'NetworkOnly'
    },
    {
      urlPattern: ({ request, url }) => {
        if (request.mode !== 'navigate' || url.origin !== self.location.origin) return false

        const firstPathSegment = url.pathname.split('/')[1]
        return ['', 'p', 'c', 'i'].includes(firstPathSegment)
      },
      handler: 'NetworkFirst',
      options: {
        cacheName: 'public-pages',
        networkTimeoutSeconds: 5,
        cacheableResponse: { statuses: [200] },
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }
      }
    },
    {
      urlPattern: ({ request, url }) => request.destination === 'font' &&
        url.origin === self.location.origin &&
        !request.headers.has('range'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'storefront-fonts',
        cacheableResponse: { statuses: [200] },
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }
      }
    },
    {
      urlPattern: ({ request, url }) => request.destination === 'image' &&
        url.origin === self.location.origin &&
        !request.headers.has('range'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'storefront-images',
        cacheableResponse: { statuses: [200] },
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }
      }
    }
  ]
}).then(({ count, size, warnings }) => {
  warnings.forEach(warning => console.warn(warning))
  console.log(`Generated service worker with ${count} precached files (${size} bytes).`)
}).catch(error => {
  console.error(error)
  process.exitCode = 1
})
