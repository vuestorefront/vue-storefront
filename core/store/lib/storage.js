const CACHE_TIMEOUT = 1000
const DISABLE_PERSISTANCE_AFTER = 3
class LocalForageCacheDriver {
  constructor (collection, useLocalCacheByDefault = true) {
    const collectionName = collection._config.storeName
    const dbName = collection._config.name
    if (typeof global.$VS.cacheErrorsCount === 'undefined') {
      global.$VS.cacheErrorsCount = {}
    }
    if (typeof global.$VS.cacheErrorsCount[collectionName] === 'undefined') {
      global.$VS.cacheErrorsCount[collectionName] = 0
    }
    if (typeof global.$VS.localCache === 'undefined') {
      global.$VS.localCache = {}
    }
    if (typeof global.$VS.localCache[dbName] === 'undefined') {
      global.$VS.localCache[dbName] = {}
    }
    if (typeof global.$VS.localCache[dbName][collectionName] === 'undefined') {
      global.$VS.localCache[dbName][collectionName] = {}
    }
    this._collectionName = collectionName
    this._dbName = dbName
    this._useLocalCacheByDefault = useLocalCacheByDefault
    this._localCache = global.$VS.localCache[dbName][collectionName]
    this._localForageCollection = collection
    this._lastError = null
  }

  // Remove all keys from the datastore, effectively destroying all data in
  // the app's key/value store!
  clear (callback) {
    return this._localForageCollection.clear(callback)
  }

  // Retrieve an item from the store. Unlike the original async_storage
  // library in Gaia, we don't modify return values at all. If a key's value
  // is `undefined`, we pass that value to the callback function.
  getItem (key, callback) {
    const self = this
    const isCallbackCallable = (typeof callback !== 'undefined' && callback)
    let isResolved = false
    if (self._useLocalCacheByDefault && self._localCache[key]) {
      // console.debug('Local cache fallback for GET', key)
      return new Promise((resolve, reject) => {
        const value = typeof self._localCache[key] !== 'undefined' ? self._localCache[key] : null
        if (isCallbackCallable) callback(null, value)
        resolve(value)
      })
    }

    if (!global.$VS.isSSR) {
      if (global.$VS.cacheErrorsCount[self._collectionName] >= DISABLE_PERSISTANCE_AFTER && self._useLocalCacheByDefault) {
        console.error('Persistent cache disabled becasue of previous errors [get]', key)
        return new Promise((resolve, reject) => {
          if (isCallbackCallable) callback(null, null)
          resolve(null)
        })
      } else {
        const startTime = new Date().getTime()
        // console.debug('No local cache fallback for GET', key)
        const promise = this._localForageCollection.ready().then(() => self._localForageCollection.getItem(key).then(result => {
          const endTime = new Date().getTime()
          if ((endTime - startTime) >= CACHE_TIMEOUT) {
            console.error('Cache promise resolved after [ms]', key, (endTime - startTime))
          }
          if (!isResolved) {
            if (isCallbackCallable) {
              callback(null, result)
            }
            isResolved = true
          } else {
            console.debug('Skipping return value as it was previously resolved')
          }
          return result
        }).catch(err => {
          this._lastError = err
          if (!isResolved) {
            if (isCallbackCallable) callback(null, typeof self._localCache[key] !== 'undefined' ? self._localCache[key] : null)
          }
          console.error(err)
          isResolved = true
        }))

        setTimeout(function () {
          if (!isResolved) { // this is cache time out check
            console.error('Cache not responding within ' + CACHE_TIMEOUT + ' ms for [get]', key, global.$VS.cacheErrorsCount[self._collectionName])
            global.$VS.cacheErrorsCount[self._collectionName] = global.$VS.cacheErrorsCount[self._collectionName] ? global.$VS.cacheErrorsCount[self._collectionName] + 1 : 1
            if (isCallbackCallable) callback(null, typeof self._localCache[key] !== 'undefined' ? self._localCache[key] : null)
          }
        }, CACHE_TIMEOUT)
        return promise
      }
    } else {
      return new Promise((resolve, reject) => {
        const value = typeof self._localCache[key] !== 'undefined' ? self._localCache[key] : null
        if (isCallbackCallable) callback(null, value)
        resolve(value)
      })
    }
  }

  // Iterate over all items in the store.
  iterate (iterator, callback) {
    const self = this
    const isIteratorCallable = (typeof iterator !== 'undefined' && iterator)
    const isCallbackCallable = (typeof callback !== 'undefined' && callback)
    let globalIterationNumber = 1
    if (this._useLocalCacheByDefault) {
      // console.debug('Local cache iteration')
      for (const localKey in self._localCache) {
        if (isIteratorCallable) {
          iterator(self._localCache[localKey], localKey, globalIterationNumber)
          globalIterationNumber++
        }
      }
    }
    let isResolved = false
    const promise = this._localForageCollection.ready().then(() => self._localForageCollection.iterate(function (value, key, iterationNumber) {
      isResolved = true
      if (isIteratorCallable) {
        if (self._useLocalCacheByDefault) {
          if (typeof self._localCache[key] === 'undefined') {
            iterator(value, key, globalIterationNumber)
            globalIterationNumber++
          } else {
            // console.debug('Skipping iteration key because local cache executed', key)
          }
        } else {
          iterator(value, key, iterationNumber)
        }
      }
    })).catch((err) => {
      this._lastError = err
      console.error(err)
      isResolved = true
    })
    setTimeout(function () {
      if (!isResolved) { // this is cache time out check
        console.error('Cache not responding within ' + CACHE_TIMEOUT + ' ms for [iterate]', global.$VS.cacheErrorsCount[self._collectionName])
        global.$VS.cacheErrorsCount[self._collectionName] = global.$VS.cacheErrorsCount[self._collectionName] ? global.$VS.cacheErrorsCount[self._collectionName] + 1 : 1
        if (isCallbackCallable) callback(null, null)
      }
    }, CACHE_TIMEOUT)
    return promise
  }

  // Same as localStorage's key() method, except takes a callback.
  key (n, callback) {
    return this._localForageCollection.key(n, callback)
  }

  keys (callback) {
    return this._localForageCollection.keys(callback)
  }

  // Supply the number of keys in the datastore to the callback function.
  length (callback) {
    return this._localForageCollection.length(callback)
  }

  // Remove an item from the store, nice and simple.
  removeItem (key, callback) {
    if (typeof self._localCache[key] !== 'undefined') {
      delete typeof self._localCache[key]
    }
    return this._localForageCollection.removeItem(key, callback)
  }

  // Set a key's value and run an optional callback once the value is set.
  // Unlike Gaia's implementation, the callback function is passed the value,
  // in case you want to operate on that value only after you're sure it
  // saved, or something like that.
  setItem (key, value, callback) {
    const self = this
    const isCallbackCallable = (typeof callback !== 'undefined' && callback)
    self._localCache[key] = value
    if (!global.$VS.isSSR) {
      if (global.$VS.cacheErrorsCount[self._collectionName] >= DISABLE_PERSISTANCE_AFTER && self._useLocalCacheByDefault) {
        console.error('Persistent cache disabled becasue of previous errors [set]', key)
        return new Promise((resolve, reject) => {
          if (isCallbackCallable) callback(null, null)
          resolve(null)
        })
      } else {
        let isResolved = false
        const promise = this._localForageCollection.ready().then(() => self._localForageCollection.setItem(key, value).then(result => {
          if (isCallbackCallable) {
            callback(null, result)
          }
          isResolved = true
        }).catch(err => {
          isResolved = true
          self._lastError = err
        }))
        setTimeout(function () {
          if (!isResolved) { // this is cache time out check
            console.error('Cache not responding within ' + CACHE_TIMEOUT + ' ms for [set]', key, global.$VS.cacheErrorsCount[self._collectionName])
            global.$VS.cacheErrorsCount[self._collectionName] = global.$VS.cacheErrorsCount[self._collectionName] ? global.$VS.cacheErrorsCount[self._collectionName] + 1 : 1
            if (isCallbackCallable) callback(null, null)
          }
        }, CACHE_TIMEOUT)
        return promise
      }
    } else {
      return new Promise((resolve, reject) => resolve())
    }
  }
}

// The actual localForage object that we expose as a module or via a
// global.$VS. It's extended by pulling in one of our other libraries.
export default LocalForageCacheDriver
