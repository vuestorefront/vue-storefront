import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'
// use it to initialize cache storage in modules
export function initCacheStorage(key) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  const cacheStorage = new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: key
  }))

  return cacheStorage
}