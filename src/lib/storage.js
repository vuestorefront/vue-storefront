class LocalForageCacheDriver {
  constructor (collection) {
    this._localCache = {}
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
    const promise = this._localForageCollection.getItem(key).then(result => {
      if (typeof callback !== 'undefined' && callback) {
        callback(null, result)
      }
      return result
    }).catch(err => {
      console.debug('UniversalStorage - probably in SSR mode: ' + err)
      callback(null, typeof self._localCache[key] !== 'undefined' ? self._localCache[key] : null)
    })

    return promise
  }

// Iterate over all items in the store.
  iterate (iterator, callback) {
    return this._localForageCollection.iterate(iterator, callback)
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
    return this._localForageCollection.removeItem(key, callback)
  }

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
  setItem (key, value, callback) {
    const self = this
    const promise = this._localForageCollection.setItem(key, value).then(result => {
      if (typeof callback !== 'undefined' && callback) {
        callback(null, result)
      }
    }).catch(err => {
      console.debug('UniversalStorage - probably in SSR mode: ' + err)
      self._localCache[key] = value
    })

    return promise
  }
}

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.
export default LocalForageCacheDriver
