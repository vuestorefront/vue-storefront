import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'

const store = {
  namespaced: true,
  state: {
    key: null
  }
}

const KEY = 'google-tag-manager'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] },
  beforeRegistration,
  afterRegistration
}

export const googleTagManager = new VueStorefrontModule(moduleConfig)
