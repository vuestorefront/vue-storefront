import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

// TODO: Move the logic to appropiate modules and depreciate this one

const KEY = 'homepage'

const store = {
  namespaced: true
}


const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] }
}

export const Homepage = new VueStorefrontModule(moduleConfig)