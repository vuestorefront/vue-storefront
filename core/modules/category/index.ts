import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'
import { module } from './store'

const KEY = 'category'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }]}
}

export const Category = new VueStorefrontModule(moduleConfig)