import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'

export const KEY = 'breadcrumbs'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: KEY, module: module }
  ] },
}

export const Breadcrumbs = new VueStorefrontModule(moduleConfig)