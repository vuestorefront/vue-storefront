import { module } from './store'
import { plugin } from './store/plugin'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'
import { initCacheStorage } from '@vue-storefront/module/helpers/initCacheStorage'
import { afterRegistration } from './hooks/afterRegistration'

export const KEY = 'recently-viewed'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }], plugin },
  afterRegistration
}

export const RecentlyViewed = new VueStorefrontModule(moduleConfig)
