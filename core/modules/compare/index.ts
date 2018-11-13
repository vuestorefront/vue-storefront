import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'
import { afterRegistration } from './hooks/afterRegistration'
export const KEY = 'compare'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  afterRegistration
}

export const Compare = new VueStorefrontModule(moduleConfig)
