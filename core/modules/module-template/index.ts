import { store } from './store'
import beforeRegistration from './hooks/beforeRegistration'
import afterRegistration from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'

export const KEY = 'example'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store,
  beforeRegistration,
  afterRegistration
}

export const Mailchimp = new VueStorefrontModule(moduleConfig)