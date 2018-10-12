import store from './store'
import beforeRegistration from './extends/beforeRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'mailchimp'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store,
  beforeRegistration
}

export const Mailchimp = new VueStorefrontModule(moduleConfig)