class LocalForageCacheDriver {
  constructor (collection, useLocalCacheByDefault = true) {
    const collectionName = collection._config.storeName
    if (typeof global.$VS.localCache === 'undefined') {
      global.$VS.localCache = {}
    }
    if (typeof global.$VS.localCache[collectionName] === 'undefined') {
      global.$VS.localCache[collectionName] = {}
    }
    this._useLocalCacheByDefault = useLocalCacheByDefault
    this._localCache = global.$VS.localCache[collectionName]
    this._localForageCollection = collection
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
    // console.debug('No local cache fallback for GET', key)
    const promise = this._localForageCollection.getItem(key).then(result => {
      if (isCallbackCallable) {
        callback(null, result)
      }
      isResolved = true
      return result
    }).catch(err => {
      console.debug('UniversalStorage - GET - probably in SSR mode: ' + err)
      if (isCallbackCallable) callback(null, typeof self._localCache[key] !== 'undefined' ? self._localCache[key] : null)
      isResolved = true
    })

    setTimeout(function () {
      if (!isResolved) { // this is cache time out check
        console.error('Cache not responding within 2s')
        if (isCallbackCallable) callback(null, typeof self._localCache[key] !== 'undefined' ? self._localCache[key] : null)
      }
    }, 2000)
    return promise
  }

  // Iterate over all items in the store.
  iterate (iterator, callback) {
    const self = this
    const isIteratorCallable = (typeof iterator !== 'undefined' && iterator)
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
    return this._localForageCollection.iterate(function (value, key, iterationNumber) {
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
    })
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
    const promise = this._localForageCollection.setItem(key, value).then(result => {
      if (isCallbackCallable) {
        callback(null, result)
      }
    }).catch(err => {
      console.debug('UniversalStorage - SET - probably in SSR mode: ' + err)
    })

    return promise
  }
}

// The actual localForage object that we expose as a module or via a
// global.$VS. It's extended by pulling in one of our other libraries.
export default LocalForageCacheDriver
