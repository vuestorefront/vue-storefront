import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export function beforeRegistration ({ Vue, config, store, isServer }) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  StorageManager.register('categoriesCollection', new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'categories',
    driver: localForage[config.localForage.defaultDrivers['categories']]
  })))

  StorageManager.register('attributesCollection', new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'attributes',
    driver: localForage[config.localForage.defaultDrivers['attributes']]
  })))

  StorageManager.register('elasticCacheCollection', new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'elasticCache',
    driver: localForage[config.localForage.defaultDrivers['elasticCache']]
  }), true, config.server.elasticCacheQuota))

  StorageManager.register('productsCollection', new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'products',
    driver: localForage[config.localForage.defaultDrivers['products']]
  })))
}
