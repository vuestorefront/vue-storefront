import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';
const StorageManager = {
  currentStoreCode: '',
  /**
   * Register the cache storage - this is required prior to accessing the collection
   * @param collectionName string name of the cache collection to register
   * @param collectionInstance UniversalStorage driver
   */
  register: function (collectionName, collectionInstance: UniversalStorage): UniversalStorage {
    this[collectionName] = collectionInstance
    return collectionInstance
  },
  /**
   * Check if the specified collection is already registered
   * @param collectionName string collection name to check
   */
  exists (collectionName): boolean {
    return !!this[collectionName]
  },
  /**
   * Returns the UniversalStorage driver for specific key
   * @returns UniversalStorage
   */
  get: function (collectionName): UniversalStorage {
    if (!this.exists(collectionName)) {
      return this.register(collectionName, initCacheStorage(collectionName, true, false))
    } else {
      return this[collectionName]
    }
  }
}

export { StorageManager }
