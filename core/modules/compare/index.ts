
import { compareStore } from './store'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';
import { plugin } from './store/plugin'
import { StorefrontModule } from '@vue-storefront/module';
// import * as localForage from 'localforage'
// import UniversalStorage from '@vue-storefront/core/store/lib/storage'
// import { currentStoreView } from '@vue-storefront/core/lib/multistore'
// import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export const cacheStorage = initCacheStorage('compare')
export const CompareModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  // Vue.prototype.$db.compareCollection = initCacheStorage('compare')
  // const storeView = currentStoreView()
  // const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  // StorageManager.set('compareCollection', new UniversalStorage(localForage.createInstance({
  //   name: dbNamePrefix + 'shop',
  //   storeName: 'compare',
  //   driver: localForage[appConfig.localForage.defaultDrivers['compare']]
  // })))

  initCacheStorage('compare')

  store.registerModule('compare', compareStore)
  store.subscribe(plugin)
}
