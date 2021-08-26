import { Logger } from '@vue-storefront/core/lib/logger'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/lib/store/storage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'

function _prepareCacheStorage (key, localized = !config.storeViews.commonCache, storageQuota = 0) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView && storeView.storeCode ? storeView.storeCode + '-' : ''
  const cacheDriver = config.localForage && config.localForage.defaultDrivers[key]
    ? config.localForage.defaultDrivers[key]
    : 'LOCALSTORAGE'

  return new UniversalStorage(localForage.createInstance({
    name: localized ? `${dbNamePrefix}shop` : 'shop',
    storeName: key,
    driver: localForage[cacheDriver]
  }), true, storageQuota)
}

const StorageManager = {
  currentStoreCode: '',
  storageMap: {},
  /**
   * Register the cache storage index that can be later accessed and modified - this is required prior to accessing the collection
   * @param collectionName name of the cache collection to create
   * @param isLocalized if set to `false` data will be shared between storeViews (default `true`)
   * @param storageQuota max size of storage, 0 if unlimited (default `0`)
   */
  init: function (collectionName: string, isLocalized = !config.storeViews.commonCache, storageQuota = 0) {
    this.storageMap[collectionName] = _prepareCacheStorage(collectionName, isLocalized, storageQuota)
    return this.storageMap[collectionName]
  },
  /**
   * Override or register the cache storage - this is required prior to accessing the collection
   * @param collectionName { string} string name of the cache collection to register
   * @param item UniversalStorage driver
   */
  set: function (collectionName: string, collectionInstance: UniversalStorage): UniversalStorage {
    this.storageMap[collectionName] = collectionInstance
    return collectionInstance
  },
  /**
   * Check if the specified collection is already registered
   * @param collectionName string collection name to check
   */
  exists (collectionName): boolean {
    return !!this.storageMap[collectionName]
  },
  /**
   * Returns the UniversalStorage driver for specific key.
   * If it doesnt exist it creates it with defaults for `init`
   * @returns UniversalStorage
   */
  get: function (collectionName): UniversalStorage {
    if (!this.exists(collectionName)) {
      Logger.warn('Called cache collection ' + collectionName + ' does not exist. Initializing.', 'cache')
      return this.set(collectionName, initCacheStorage(collectionName, true)) // eslint-disable-line @typescript-eslint/no-use-before-define
    } else {
      return this.storageMap[collectionName]
    }
  },
  clear (): Promise<void[]> {
    const promiseArray = Object.keys(this.storageMap).map((collectionName) => {
      return (config.localForage.preserveCollections || []).every(collectionToKeep => collectionName !== collectionToKeep) && this.storageMap[collectionName].clear().then(() => {
        Logger.warn(`storeManager cleared: ${collectionName}`, `storeManager cleared: ${collectionName}`, `storeManager cleared: ${collectionName}`)()
      })
    })
    return Promise.all(promiseArray)
  }
}

/**
 * @deprecated to be removed in 2.0 in favor to `StorageManager`
 * */
function initCacheStorage (key, localised = true, registerStorgeManager = true) {
  if (registerStorgeManager) {
    if (!StorageManager.exists(key)) {
      return StorageManager.set(key, _prepareCacheStorage(key, localised))
    } else {
      return StorageManager.get(key)
    }
  } else {
    return _prepareCacheStorage(key, localised)
  }
}

export { StorageManager, initCacheStorage }
