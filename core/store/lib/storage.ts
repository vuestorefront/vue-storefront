import Vue from 'vue'
import * as localForage from 'localforage'
import { Logger } from '@vue-storefront/core/lib/logger'
import { isServer } from '@vue-storefront/core/helpers'

const CACHE_TIMEOUT = 800
const CACHE_TIMEOUT_ITERATE = 2000
const DISABLE_PERSISTANCE_AFTER = 1
const DISABLE_PERSISTANCE_AFTER_SAVE = 30

function roughSizeOfObject (object) {
  const objectList = []
  const stack = [ object ]
  let bytes = 0
  while (stack.length) {
    const value = stack.pop()
    if (typeof value === 'boolean') {
      bytes += 4
    } else if (typeof value === 'string') {
      bytes += value.length * 2
    } else if (typeof value === 'number') {
      bytes += 8
    } else if (
      typeof value === 'object' &&
      objectList.indexOf(value) === -1
    ) {
      objectList.push(value)
      for (var i in value) {
        stack.push(value[ i ])
      }
    }
  }
  return bytes
}

class LocalForageCacheDriver {
  private _collectionName: string;
  private _dbName: string;
  private _lastError: any;
  private _localCache: any;
  private _localForageCollection: any;
  private _persistenceErrorNotified: boolean;
  private _useLocalCacheByDefault: boolean;
  private cacheErrorsCount: any;
  private localCache: any;
  private _storageQuota: number;

  public constructor (collection, useLocalCacheByDefault = true, storageQuota = 0) {
    const collectionName = collection._config.storeName
    const dbName = collection._config.name
    this._storageQuota = storageQuota

    if (this._storageQuota && !isServer) {
      const storageQuota = this._storageQuota
      const iterateFnc = this.iterate.bind(this)
      const removeItemFnc = this.removeItem.bind(this)
      setInterval(() => {
        let storageSize = 0
        this.iterate((item, id, number) => {
          storageSize += roughSizeOfObject(item)
        }, (err, result) => { // eslint-disable-line handle-callback-err
          if ((storageSize / 1024) > storageQuota) {
            Logger.info('Clearing out the storage ', 'cache', { storageSizeKB: Math.round(storageSize / 1024), storageQuotaKB: storageQuota })()
            const howManyItemsToRemove = 100
            const keysPurged = []
            iterateFnc((item, id, number) => {
              if (number < howManyItemsToRemove) {
                removeItemFnc(id)
                keysPurged.push(id)
              }
            }, (err, result) => { // eslint-disable-line handle-callback-err
              Logger.info('Cache purged', 'cache', { keysPurged })()
            })
          } else {
            Logger.info('Storage size', 'cache', { storageSizeKB: Math.round(storageSize / 1024) })()
          }
        })
      }, 30000)
    }
    if (typeof this.cacheErrorsCount === 'undefined') {
      this.cacheErrorsCount = {}
    }
    if (typeof this.cacheErrorsCount[collectionName] === 'undefined') {
      this.cacheErrorsCount[collectionName] = 0
    }
    if (isServer) {
      this._localCache = {}
    } else {
      if (typeof Vue.prototype.$localCache === 'undefined') {
        Vue.prototype.$localCache = {}
      }
      if (typeof Vue.prototype.$localCache[dbName] === 'undefined') {
        Vue.prototype.$localCache[dbName] = {}
      }
      if (typeof Vue.prototype.$localCache[dbName][collectionName] === 'undefined') {
        Vue.prototype.$localCache[dbName][collectionName] = {}
      }
      this._localCache = Vue.prototype.$localCache[dbName][collectionName]
    }
    this._collectionName = collectionName
    this._dbName = dbName
    this._useLocalCacheByDefault = useLocalCacheByDefault
    this._localForageCollection = collection
    this._lastError = null
    this._persistenceErrorNotified = false
  }

  // Remove all keys from the datastore, effectively destroying all data in
  // the app's key/value store!
  public clear (callback?) {
    return this._localForageCollection.clear(callback)
  }

  // Increment the database version number and recreate the context
  public recreateDb () {
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
        Logger.log('DB recreated with', existingConfig, destVersionNumber)()
      }
    }
  }

  // Retrieve an item from the store. Unlike the original async_storage
  // library in Gaia, we don't modify return values at all. If a key's value
  // is `undefined`, we pass that value to the callback function.
  public getItem (key, callback?) {
    const isCallbackCallable = (typeof callback !== 'undefined' && callback)
    let isResolved = false
    if (this._useLocalCacheByDefault && this._localCache[key]) {
      // Logger.debug('Local cache fallback for GET', key)()
      return new Promise((resolve, reject) => {
        const value = typeof this._localCache[key] !== 'undefined' ? this._localCache[key] : null
        if (isCallbackCallable) callback(null, value)
        resolve(value)
      })
    }

    if (!isServer) {
      if (this.cacheErrorsCount[this._collectionName] >= DISABLE_PERSISTANCE_AFTER && this._useLocalCacheByDefault) {
        if (!this._persistenceErrorNotified) {
          Logger.error('Persistent cache disabled becasue of previous errors [get]', key)()
          this._persistenceErrorNotified = true
        }
        return new Promise((resolve, reject) => {
          if (isCallbackCallable) callback(null, null)
          resolve(null)
        })
      } else {
        const startTime = new Date().getTime()
        // Logger.debug('No local cache fallback for GET', key)()
        const promise = this._localForageCollection.ready().then(() => this._localForageCollection.getItem(key).then(result => {
          const endTime = new Date().getTime()
          if ((endTime - startTime) >= CACHE_TIMEOUT) {
            Logger.error('Cache promise resolved after [ms]' + key + (endTime - startTime))()
          }
          if (!this._localCache[key] && result) {
            this._localCache[key] = result // populate the local cache for the next call
          }
          if (!isResolved) {
            if (isCallbackCallable) {
              callback(null, result)
            }
            isResolved = true
          } else {
            Logger.debug('Skipping return value as it was previously resolved')()
          }
          return result
        }).catch(err => {
          this._lastError = err
          if (!isResolved) {
            if (isCallbackCallable) callback(null, typeof this._localCache[key] !== 'undefined' ? this._localCache[key] : null)
          }
          Logger.error(err)()
          isResolved = true
        }))

        setTimeout(() => {
          if (!isResolved) { // this is cache time out check
            if (!this._persistenceErrorNotified) {
              Logger.error('Cache not responding for ' + key + '.', 'cache', { timeout: CACHE_TIMEOUT, errorsCount: this.cacheErrorsCount[this._collectionName] })()
              this._persistenceErrorNotified = true
              this.recreateDb()
            }
            this.cacheErrorsCount[this._collectionName] = this.cacheErrorsCount[this._collectionName] ? this.cacheErrorsCount[this._collectionName] + 1 : 1
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
  public iterate (iterator, callback?) {
    const isIteratorCallable = (typeof iterator !== 'undefined' && iterator)
    const isCallbackCallable = (typeof callback !== 'undefined' && callback)
    let globalIterationNumber = 1
    if (this._useLocalCacheByDefault) {
      // Logger.debug('Local cache iteration')()
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
            // Logger.debug('Skipping iteration key because local cache executed', key)()
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
      Logger.error(err)()
      if (!isResolved) {
        isResolved = true
        if (isCallbackCallable) callback(err, null)
      }
    })
    setTimeout(() => {
      if (!isResolved) { // this is cache time out check
        if (!this._persistenceErrorNotified) {
          Logger.error('Cache not responding. (iterate)', 'cache', { timeout: CACHE_TIMEOUT, errorsCount: this.cacheErrorsCount[this._collectionName] })()
          this._persistenceErrorNotified = true
          this.recreateDb()
        }
        this.cacheErrorsCount[this._collectionName] = this.cacheErrorsCount[this._collectionName] ? this.cacheErrorsCount[this._collectionName] + 1 : 1
        if (isCallbackCallable) callback(null, null)
      }
    }, CACHE_TIMEOUT_ITERATE)
    return promise
  }

  // Same as localStorage's key() method, except takes a callback.
  public key (n, callback?) {
    return this._localForageCollection.key(n, callback)
  }

  public keys (callback?) {
    return this._localForageCollection.keys(callback)
  }

  // Supply the number of keys in the datastore to the callback function.
  public length (callback?) {
    return this._localForageCollection.length(callback)
  }

  // Remove an item from the store, nice and simple.
  public removeItem (key, callback?) {
    if (typeof this._localCache[key] !== 'undefined') {
      delete this._localCache[key]
    }
    return this._localForageCollection.removeItem(key, callback)
  }

  // Set a key's value and run an optional callback once the value is set.
  // Unlike Gaia's implementation, the callback function is passed the value,
  // in case you want to operate on that value only after you're sure it
  // saved, or something like that.
  public setItem (key, value, callback?, memoryOnly = false) {
    const isCallbackCallable = (typeof callback !== 'undefined' && callback)
    this._localCache[key] = value
    if (memoryOnly) {
      return new Promise((resolve, reject) => {
        if (isCallbackCallable) callback(null, null)
        resolve(null)
      })
    }
    if (!isServer) {
      if (this.cacheErrorsCount[this._collectionName] >= DISABLE_PERSISTANCE_AFTER_SAVE && this._useLocalCacheByDefault) {
        if (!this._persistenceErrorNotified) {
          Logger.error('Persistent cache disabled becasue of previous errors [set]', key)()
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
              Logger.error('Cache not responding for ' + key + '.', 'cache', { timeout: CACHE_TIMEOUT, errorsCount: this.cacheErrorsCount[this._collectionName] })()
              this._persistenceErrorNotified = true
              this.recreateDb()
            }
            this.cacheErrorsCount[this._collectionName] = this.cacheErrorsCount[this._collectionName] ? this.cacheErrorsCount[this._collectionName] + 1 : 1
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

// The actual localForage object that we expose as a module. It's extended by pulling in one of our other libraries.
export default LocalForageCacheDriver
