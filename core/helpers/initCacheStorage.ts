import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'

/** create Universal Storage instance  */
export function prepareCacheStorage (key, localised = true, storageQuota = 0) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView && storeView.storeCode ? storeView.storeCode + '-' : ''
  const cacheDriver = config.localForage && config.localForage.defaultDrivers[key]
    ? config.localForage.defaultDrivers[key]
    : 'LOCALSTORAGE'

  return new UniversalStorage(localForage.createInstance({
    name: localised ? `${dbNamePrefix}shop` : 'shop',
    storeName: key,
    driver: localForage[cacheDriver]
  }), true, storageQuota)
}

/** @deprecated, to be removed in 2.0 in favor to `StorageManager`
 * Inits cache storage for given module. By default via local storage 
 * */
export function initCacheStorage (key, localised = true, registerStorgeManager = true) {
  if (registerStorgeManager) {
    if (!StorageManager.exists(key)) {
      return StorageManager.set(key, prepareCacheStorage(key, localised))
    } else {
      return StorageManager.get(key)
    }
  } else {
    return prepareCacheStorage(key, localised)
  }
}
