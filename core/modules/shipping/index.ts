import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'shipping'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { module }
}

export const Shipping = new VueStorefrontModule(moduleConfig)