import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const KEY = 'newsletter'
export const cacheStorage = initCacheStorage(KEY)
const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
}
export const Newsletter = new VueStorefrontModule(moduleConfig)
