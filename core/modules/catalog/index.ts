import { StorefrontModule } from '@vue-storefront/module'
import { productModule } from './store/product'
import { attributeModule } from './store/attribute'
import { stockModule } from './store/stock'
import { taxModule } from './store/tax'
import { categoryModule } from './store/category'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import Vue from 'vue'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export const CatalogModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  initCacheStorage('categories')
  initCacheStorage('attributes')
  initCacheStorage('products')

  StorageManager.set('elasticCacheCollection', new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'elasticCache',
    driver: localForage[appConfig.localForage.defaultDrivers['elasticCache']]
  }), true, appConfig.server.elasticCacheQuota))

  store.registerModule('product', productModule)
  store.registerModule('attribute', attributeModule)
  store.registerModule('stock', stockModule)
  store.registerModule('tax', taxModule)
  store.registerModule('category', categoryModule)
}
