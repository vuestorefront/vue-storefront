import config from 'config'
import { IndexedDB } from './indexedDB'

const clearCache = async () => {
  // clear localStorage
  if (config.clearCache.websocket.localStorage.enabled) {
    const storageKeys = Object.keys(localStorage)
    const keysForClear = config.clearCache.websocket.localStorage.keys

    for (let storageKey of storageKeys) {
      for (let key of keysForClear) {
        if (storageKey.includes(key)) {
          localStorage.removeItem(storageKey)
          break
        }
      }
    }
  }
  // clear IndexedDB
  if (config.clearCache.websocket.indexedDB.enabled) {
    const database = new IndexedDB(config.clearCache.websocket.indexedDB.database)
    const isExistDb = await database.exist()
    if (isExistDb) {
      await database.open()
      for (let storage of config.clearCache.websocket.indexedDB.keys) {
        database.clearStorage(storage)
      }
    }
  }
  // clear Service Worker
  if (config.clearCache.websocket.serviceWorker.enabled) {
    if ('serviceWorker' in navigator) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName)
        })
      })

      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister()
        })
      })
    }
  }
}

export {
  clearCache
}
