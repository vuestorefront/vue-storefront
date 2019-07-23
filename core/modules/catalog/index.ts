import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { productModule } from './store/product'
import { attributeModule } from './store/attribute'
import { stockModule } from './store/stock'
import { taxModule } from './store/tax'
import { categoryModule } from './store/category'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const CatalogModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  StorageManager.init('categories')
  StorageManager.init('attributes')
  StorageManager.init('products')
  StorageManager.init('elasticCache', true, appConfig.server.elasticCacheQuota)

  store.registerModule('product', productModule)
  store.registerModule('attribute', attributeModule)
  store.registerModule('stock', stockModule)
  store.registerModule('tax', taxModule)
  store.registerModule('category', categoryModule)
}
