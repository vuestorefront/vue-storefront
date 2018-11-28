import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import moduleRoutes from './router'

const store = {
  namespaced: true,
  state: {
    key: null
  }
}

const KEY = 'amp-renderer'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  router: { routes: moduleRoutes },
  store: { modules: [{ key: KEY, module: store }] }
}

export const AmpRenderer = new VueStorefrontModule(moduleConfig)