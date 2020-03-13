import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'
import { isServer } from '@vue-storefront/core/helpers'

import { IcmaaExtendedAttributeStore } from './store/attribute'
import { IcmaaExtendedCategoryStore } from './store/category'
import { IcmaaExtendedProductStore } from './store/product'
import { SearchAliasStore, stateKey } from './store/search-alias'

import { products, entities } from 'config'
import uniq from 'lodash-es/uniq'

export const IcmaaExtendedCatalogModule: StorefrontModule = async ({ store }) => {
  extendStore('attribute', IcmaaExtendedAttributeStore)
  extendStore('category-next', IcmaaExtendedCategoryStore)
  extendStore('product', IcmaaExtendedProductStore)
  store.registerModule(stateKey, SearchAliasStore)

  if (!isServer) {
    /**
     * Load our bunch of attributes asynchronly to prevent a huge state on load.
     * This is a memory-leak if it grows big and stuff like page-rendering and minifying will take forever.
     * ---
     * * We uncommented the original lines in `vue-storefront/core/modules/catalog/index.ts` to prevent original
     *   preloading and replace it by our, following routing.
     * * We also added `attribute.list_by_code` and `attribute.list_by_id` to the `ssr.initialStateFilter` config
     *   value to filter those from initial state json – these are massive JSON objects (like 55000 line extra).
     */
    await store.dispatch('attribute/list', {
      filterValues: uniq([...products.defaultFilters, ...entities.productList.includeFields])
    })
  }
}
