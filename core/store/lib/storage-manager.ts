import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { initCacheStorage, prepareCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';
import { Logger } from '@vue-storefront/core/lib/logger'

const StorageManager = {
  currentStoreCode: '',
  storageMap: {},
  /**
   * Register the cache storage index that can be later accessed and modified - this is required prior to accessing the collection
   * @param collectionName name of the cache collection to create
   * @param isLocalized if set to `false` data will be shared between storeViews (default `true`)
   * @param storageQuota max size of storage, 0 if unlimited (default `0`)
   */
  init: function (collectionName: string, isLocalised = true, storageQuota = 0) {
    this.storageMap[collectionName] = prepareCacheStorage(collectionName, isLocalised, storageQuota)
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
   * Returns the UniversalStorage driver for specific key
   * @returns UniversalStorage
   */
  get: function (collectionName): UniversalStorage {
    if (!this.exists(collectionName)) {
      Logger.warn('Called cache collection ' + collectionName + ' does not exist. Initializing.', 'cache')
      return this.set(collectionName, initCacheStorage(collectionName, true))
    } else {
      return this.storageMap[collectionName]
    }
  }
}

export { StorageManager }
