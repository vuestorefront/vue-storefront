import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'user'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { module }
}

export const User = new VueStorefrontModule(moduleConfig)