import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { beforeRegistration } from './hooks/beforeRegistration'
import { store } from './store'

const KEY = 'clear-cache'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] },
  beforeRegistration
}

export const ClearCache = new VueStorefrontModule(moduleConfig)
