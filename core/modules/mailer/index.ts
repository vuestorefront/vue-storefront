import { store } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'mailer'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store
}

export const Mailer = new VueStorefrontModule(moduleConfig)