
import * as localForage from 'localforage'
const CACHE_TIMEOUT = 1600
const CACHE_TIMEOUT_ITERATE = 3000
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
    this._persistenceErrorNotified = false
  }

  // Remove all keys from the datastore, effectively destroying all data in
  // the app's key/value store!
  clear (callback) {
    return this._localForageCollection.clear(callback)
  }

  // Increment the database version number and recreate the context
  recreateDb () {
    if (this._localForageCollection._config) {
      const existingConfig = Object.assign({}, this._localForageCollection._config)
      if (existingConfig.storeName) {
        // localForage.dropInstance(existingConfig) // drop the store and create the new one
        const destVersionNumber = this._localForageCollection && this._localForageCollection._dbInfo ? this._localForageCollection._dbInfo.version + 1 : 0
        if (destVersionNumber > 0) {
          this._localForageCollection = localForage.createInstance({ ...existingConfig, version: destVersionNumber })
        } else {
          this._localForageCollection = localForage.createInstance(existingConfig)
        }
        console.log('DB recreated with', existingConfig, destVersionNumber)
      }
    }
  }

  // Retrieve an item from the store. Unlike the original async_storage
  // library in Gaia, we don't modify return values at all. If a key's value
  // is `undefined`, we pass that value to the callback function.
  getItem (key, callback) {
    const isCallbackCallable = (typeof callback !== 'undefined' && callback)
    let isResolved = false
    if (this._useLocalCacheByDefault && this._localCache[key]) {
      // console.debug('Local cache fallback for GET', key)
      return new Promise((resolve, reject) => {
        const value = typeof this._localCache[key] !== 'undefined' ? this._localCache[key] : null
        if (isCallbackCallable) callback(null, value)
        resolve(value)
      })
    }

    if (!global.$VS.isSSR) {
      if (global.$VS.cacheErrorsCount[this._collectionName] >= DISABLE_PERSISTANCE_AFTER && this._useLocalCacheByDefault) {
        if (!this._persistenceErrorNotified) {
          console.error('Persistent cache disabled becasue of previous errors [get]', key)
          this._persistenceErrorNotified = true
        }
        return new Promise((resolve, reject) => {
          if (isCallbackCallable) callback(null, null)
          resolve(null)
        })
      } else {
        const startTime = new Date().getTime()
        // console.debug('No local cache fallback for GET', key)
        const promise = this._localForageCollection.ready().then(() => this._localForageCollection.getItem(key).then(result => {
          const endTime = new Date().getTime()
          if ((endTime - startTime) >= CACHE_TIMEOUT) {
            console.error('Cache promise resolved after [ms]', key, (endTime - startTime))
          }
          if (!this._localCache[key]) {
            this._localCache[key] = result // populate the local cache for the next call
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
            if (isCallbackCallable) callback(null, typeof this._localCache[key] !== 'undefined' ? this._localCache[key] : null)
          }
          console.error(err)
          isResolved = true
        }))

        setTimeout(() => {
          if (!isResolved) { // this is cache time out check
            if (!this._persistenceErrorNotified) {
              console.error('Cache not responding within ' + CACHE_TIMEOUT + ' ms for [get]', key, global.$VS.cacheErrorsCount[this._collectionName])
              this._persistenceErrorNotified = true
              this.recreateDb()
            }
            global.$VS.cacheErrorsCount[this._collectionName] = global.$VS.cacheErrorsCount[this._collectionName] ? global.$VS.cacheErrorsCount[this._collectionName] + 1 : 1
            if (isCallbackCallable) callback(null, typeof this._localCache[key] !== 'undefined' ? this._localCache[key] : null)
          }
        }, CACHE_TIMEOUT)
        return promise
      }
    } else {
      return new Promise((resolve, reject) => {
        const value = typeof this._localCache[key] !== 'undefined' ? this._localCache[key] : null
        if (isCallbackCallable) callback(null, value)
        resolve(value)
      })
    }
  }

  // Iterate over all items in the store.
  iterate (iterator, callback) {
    const isIteratorCallable = (typeof iterator !== 'undefined' && iterator)
    const isCallbackCallable = (typeof callback !== 'undefined' && callback)
    let globalIterationNumber = 1
    if (this._useLocalCacheByDefault) {
      // console.debug('Local cache iteration')
      for (const localKey in this._localCache) {
        if (isIteratorCallable) {
          iterator(this._localCache[localKey], localKey, globalIterationNumber)
          globalIterationNumber++
        }
      }
    }
    let isResolved = false
    const promise = this._localForageCollection.ready().then(() => this._localForageCollection.iterate((value, key, iterationNumber) => {
      isResolved = true
      if (isIteratorCallable) {
        if (this._useLocalCacheByDefault) {
          if (typeof this._localCache[key] === 'undefined') {
            iterator(value, key, globalIterationNumber)
            globalIterationNumber++
          } else {
            // console.debug('Skipping iteration key because local cache executed', key)
          }
        } else {
          iterator(value, key, iterationNumber)
        }
      }
    }, (err, result) => {
      if (isCallbackCallable) callback(err, result)
      isResolved = true
    })).catch(err => {
      this._lastError = err
      console.error(err)
      if (!isResolved) {
        isResolved = true
        if (isCallbackCallable) callback(err, null)
      }
    })
    setTimeout(() => {
      if (!isResolved) { // this is cache time out check
        if (!this._persistenceErrorNotified) {
          console.error('Cache not responding within ' + CACHE_TIMEOUT_ITERATE + ' ms for [iterate]', global.$VS.cacheErrorsCount[this._collectionName])
          this._persistenceErrorNotified = true
          this.recreateDb()
        }
        global.$VS.cacheErrorsCount[this._collectionName] = global.$VS.cacheErrorsCount[this._collectionName] ? global.$VS.cacheErrorsCount[this._collectionName] + 1 : 1
        if (isCallbackCallable) callback(null, null)
      }
    }, CACHE_TIMEOUT_ITERATE)
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
    if (typeof this._localCache[key] !== 'undefined') {
      delete this._localCache[key]
    }
    return this._localForageCollection.removeItem(key, callback)
  }

  // Set a key's value and run an optional callback once the value is set.
  // Unlike Gaia's implementation, the callback function is passed the value,
  // in case you want to operate on that value only after you're sure it
  // saved, or something like that.
  setItem (key, value, callback) {
    const isCallbackCallable = (typeof callback !== 'undefined' && callback)
    this._localCache[key] = value
    if (!global.$VS.isSSR) {
      if (global.$VS.cacheErrorsCount[this._collectionName] >= DISABLE_PERSISTANCE_AFTER && this._useLocalCacheByDefault) {
        if (!this._persistenceErrorNotified) {
          console.error('Persistent cache disabled becasue of previous errors [set]', key)
          this._persistenceErrorNotified = true
        }
        return new Promise((resolve, reject) => {
          if (isCallbackCallable) callback(null, null)
          resolve(null)
        })
      } else {
        let isResolved = false
        const promise = this._localForageCollection.ready().then(() => this._localForageCollection.setItem(key, value).then(result => {
          if (isCallbackCallable) {
            callback(null, result)
          }
          isResolved = true
        }).catch(err => {
          isResolved = true
          this._lastError = err
        }))
        setTimeout(() => {
          if (!isResolved) { // this is cache time out check
            if (!this._persistenceErrorNotified) {
              console.error('Cache not responding within ' + CACHE_TIMEOUT + ' ms for [set]', key, global.$VS.cacheErrorsCount[this._collectionName])
              this._persistenceErrorNotified = true
              this.recreateDb()
            }
            global.$VS.cacheErrorsCount[this._collectionName] = global.$VS.cacheErrorsCount[this._collectionName] ? global.$VS.cacheErrorsCount[this._collectionName] + 1 : 1
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
