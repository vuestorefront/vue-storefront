import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'wishlist'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { module }
}

export const Wishlist = new VueStorefrontModule(moduleConfig)