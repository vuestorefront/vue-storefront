# Post-release cache flushing module

This module allows you to control the state of the cache (localstorage, indexedDB, service worker) in the user's browser after the release of the application.

## Using

There are 2 ways to clear the cache after release:
1. Websocket - after the release you should connect to the websocket endpoint specified in the configs - `default.json` (`clearCache.websocket.endpoint`) and send the message defined in the same file - `clearCache.websocket.message`. This allows you to manage the cache for those users who are on the site at the time of release.
2. Versioning - define the ENV (name you can set in `default.json` - `clearCache.version.envName`) that contain current version of the site and update it after each release. This allows you to manage the cache for those users who will come on the site after release.

For enable this module uncomment connect in `src/modules/server.ts` file. It should look like this:
```js
const isProd = process.env.NODE_ENV === 'production'

export const serverModules = [
  'src/modules/robots',
  'src/modules/clear-cache'
  // ['src/modules/compress', { enabled: isProd }]
]
```
And enable module in `default.json` - `clearCache.enabled: true`

You can also control how to clear the user's cache through configs, as well as what to clean.
```json
"clearCache": {
  "enabled": true, // enabled/disabled module
  "websocket": {
    "enabled": true, // enabled/disabled websocket way
    "endpoint": "/clear-cache", // endpoint for websocket
    "key": "clear-cache", // message that you need send for init proccess clear cache
    "localStorage": {
      "enabled": true, // enabled/disabled clear localstorage
      "keys": ["elasticCache", "url", "attributes"] // keys that you want to clear
    },
    "indexedDB": {
      "enabled": true, // enabled/disabled clear indexedDB
      "database": "shop", // database name
      "keys": ["attributes", "categories", "elasticCache"] // keys that you want to clear
    },
    "serviceWorker": {
      "enabled": true  // enabled/disabled clear service worker
    }
  },
  "version": {
    "enabled": true, // enabled/disabled versioning way
    "key": "version", // key for save current version in localstorage
    "endpoint": "/vsf-version", // endpoint for check current server version
    "envName": "VSF_VERSION" // ENV that contain current server version
  }
}
```