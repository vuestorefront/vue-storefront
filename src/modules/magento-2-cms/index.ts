import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { store } from './store'
import { afterRegistration } from './hooks/afterRegistration'

const KEY = 'cms'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] },
  afterRegistration
}

export const Magento2CMS = new VueStorefrontModule(moduleConfig)