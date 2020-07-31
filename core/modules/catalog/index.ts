import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { productModule } from './store/product'
import { attributeModule } from './store/attribute'
import { stockModule } from './store/stock'
import { taxModule } from './store/tax'
import { categoryModule } from './store/category'
import { catalogHooks } from './hooks'
import { getAttributesFromMetadata } from './helpers/associatedProducts'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import config from 'config'
import { filterChangedProduct, productAfterCustomoptions, productAfterBundleoptions, productAfterPriceupdate, onUserPricesRefreshed } from './events'
import { isServer } from '@vue-storefront/core/helpers'
import uniq from 'lodash-es/uniq'

export const CatalogModule: StorefrontModule = async function ({ store, router, appConfig }) {
  StorageManager.init('categories')
  StorageManager.init('attributes')
  StorageManager.init('products')
  StorageManager.init('elasticCache', true, appConfig.server.elasticCacheQuota)

  store.registerModule('product', productModule)
  store.registerModule('attribute', attributeModule)
  store.registerModule('stock', stockModule)
  store.registerModule('tax', taxModule)
  store.registerModule('category', categoryModule)

  catalogHooks.afterSetBundleProducts(products => getAttributesFromMetadata(store, products))
  catalogHooks.afterSetGroupedProduct(products => getAttributesFromMetadata(store, products))

  if (!config.entities.attribute.loadByAttributeMetadata) {
    await store.dispatch('attribute/list', { // loading attributes for application use
      filterValues: uniq([...config.products.defaultFilters, ...config.entities.productListWithChildren.includeFields])
    })
  }

  if (!isServer) {
    // Things moved from Product.js
    EventBus.$on('product-after-priceupdate', product => productAfterPriceupdate(product, store))
    EventBus.$on('filter-changed-product', filterOptions => filterChangedProduct(filterOptions, store, router))
    EventBus.$on('product-after-customoptions', payload => productAfterCustomoptions(payload, store))
    EventBus.$on('product-after-bundleoptions', payload => productAfterBundleoptions(payload, store))

    if (config.usePriceTiers || store.getters['tax/getIsUserGroupedTaxActive']) {
      EventBus.$on('user-after-loggedin', onUserPricesRefreshed.bind(null, store, router))
      EventBus.$on('user-after-logout', onUserPricesRefreshed.bind(null, store, router))
    }
  }
}
