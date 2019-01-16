import { VueStorefrontModuleConfig, VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { module } from './store'
import { beforeRegistration } from './hooks/beforeRegistration'

export const KEY = 'order'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  beforeRegistration
}

export const Order = new VueStorefrontModule(moduleConfig)