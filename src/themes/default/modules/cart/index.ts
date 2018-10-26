import { module } from './store'
import { VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

const moduleConfig: VueStorefrontModuleConfig = {
  key: 'cart',
  store: { module: module },
}

export const extendedCart = moduleConfig
