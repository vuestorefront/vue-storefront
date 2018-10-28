import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'compare'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { module }
}

export const Compare = new VueStorefrontModule(moduleConfig)
