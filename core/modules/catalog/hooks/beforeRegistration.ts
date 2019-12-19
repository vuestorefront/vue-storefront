import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/lib/store/storage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export function beforeRegistration ({ Vue, config, store, isServer }) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  Vue.prototype.$db.categoriesCollection = new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'categories',
    driver: localForage[config.localForage.defaultDrivers['categories']]
  }))

  Vue.prototype.$db.attributesCollection = new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'attributes',
    driver: localForage[config.localForage.defaultDrivers['attributes']]
  }))

  Vue.prototype.$db.elasticCacheCollection = new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'elasticCache',
    driver: localForage[config.localForage.defaultDrivers['elasticCache']]
  }), true, config.server.elasticCacheQuota)
}
