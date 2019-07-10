import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export function beforeRegistration ({ Vue, config, store, isServer }) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  StorageManager.set('categoriesCollection', new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'categories',
    driver: localForage[config.localForage.defaultDrivers['categories']]
  })))

  StorageManager.set('attributesCollection', new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'attributes',
    driver: localForage[config.localForage.defaultDrivers['attributes']]
  })))

  StorageManager.set('elasticCacheCollection', new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'elasticCache',
    driver: localForage[config.localForage.defaultDrivers['elasticCache']]
  }), true, config.server.elasticCacheQuota)
}
