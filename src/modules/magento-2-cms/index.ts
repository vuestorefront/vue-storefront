import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { store } from './store'

const KEY = 'cms'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] },
}

export const Magento2CMS = new VueStorefrontModule(moduleConfig)