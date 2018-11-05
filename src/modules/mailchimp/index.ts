import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'
import { initCacheStorage } from '../initCacheStorage'

export const KEY = 'mailchimp'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
}

export const Mailchimp = new VueStorefrontModule(moduleConfig)