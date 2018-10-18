import { store } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'review'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store
}

export const Review = new VueStorefrontModule(moduleConfig)