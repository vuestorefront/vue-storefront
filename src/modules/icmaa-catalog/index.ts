import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'

import { IcmaaAttributeStore } from './store/attribute'
import { IcmaaCatalogStore } from './store/category'
import { SearchAliasStore, stateKey } from './store/search-alias'

export const IcmaaExtendedCatalogModule: StorefrontModule = function ({ store }) {
  extendStore('attribute', IcmaaAttributeStore)
  extendStore('category-next', IcmaaCatalogStore)
  store.registerModule(stateKey, SearchAliasStore)
}
