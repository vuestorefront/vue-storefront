import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'

// TODO: Move the logic to appropiate modules and depreciate this one

const KEY = 'homepage'

const store = {
  namespaced: true,
  state: {
    new_collection: []
  }
}


const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] }
}

export const Homepage = new VueStorefrontModule(moduleConfig)