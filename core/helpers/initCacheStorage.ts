import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'

function _prepareCachestorage (key, localised = true) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''
  const cacheDriver = config.localForage && config.localForage.defaultDrivers[key]
    ? config.localForage.defaultDrivers[key]
    : 'LOCALSTORAGE'

  return new UniversalStorage(localForage.createInstance({
    name: localised ? `${dbNamePrefix}shop` : 'shop',
    storeName: key,
    driver: localForage[cacheDriver]
  }))
}

/** Inits cache storage for given module. By default via local storage */
export function initCacheStorage (key, localised = true, registerStorgeManager = true) {
  if (registerStorgeManager) {
    if (!StorageManager.exists(key)) {
      return StorageManager.register(key, _prepareCachestorage(key, localised))
    } else {
      return StorageManager.get(key)
    }
  } else {
    return _prepareCachestorage(key, localised)
  }
}
