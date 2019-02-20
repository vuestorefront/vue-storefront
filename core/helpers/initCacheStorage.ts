import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import rootStore from '@vue-storefront/core/store'

/** Inits cache storage for given module. By default via local storage */
export function initCacheStorage(key, localised = true) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''
  const config = rootStore.state.config
  const cacheDriver = config.localForage && config.localForage.defaultDrivers[key] ?
    config.localForage.defaultDrivers[key] :
    'LOCALSTORAGE'

  if (localised) {
    const cacheStorage = new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: key,
      driver: localForage[cacheDriver]
    }))
    return cacheStorage
  } else {
    const cacheStorage = new UniversalStorage(localForage.createInstance({
      name: 'shop',
      storeName: key,
      driver: localForage[cacheDriver]
    }))
    return cacheStorage
  }
}
