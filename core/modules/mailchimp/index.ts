import { store } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'mailchimp'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store
}

export const Mailchimp = new VueStorefrontModule(moduleConfig)