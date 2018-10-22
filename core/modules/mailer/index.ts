import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'mailer'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { module }
}

export const Mailer = new VueStorefrontModule(moduleConfig)