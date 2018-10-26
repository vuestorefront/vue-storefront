import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'
import { afterRegistration } from './hooks/afterRegistration'
export const KEY = 'google-analytics'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration
}

export const GoogleAnalytics = new VueStorefrontModule(moduleConfig)
