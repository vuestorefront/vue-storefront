import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'

import { IcmaaExtendedAttributeStore } from './store/attribute'
import { IcmaaExtendedCategoryStore } from './store/category'
import { IcmaaExtendedProductStore } from './store/product'
import { SearchAliasStore, stateKey } from './store/search-alias'

export const IcmaaExtendedCatalogModule: StorefrontModule = function ({ store }) {
  extendStore('attribute', IcmaaExtendedAttributeStore)
  extendStore('category-next', IcmaaExtendedCategoryStore)
  extendStore('product', IcmaaExtendedProductStore)
  store.registerModule(stateKey, SearchAliasStore)
}
