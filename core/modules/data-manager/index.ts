import { VueStorefrontModuleConfig, VueStorefrontModule } from '@vue-storefront/module'
import { module } from './store'

export const KEY = 'dataManager'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
}

export const DataManager = new VueStorefrontModule(moduleConfig)