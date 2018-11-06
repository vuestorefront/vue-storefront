import { module } from './store'
import { plugin } from './store/plugin'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'
import { initCacheStorage } from '@vue-storefront/module/helpers/initCacheStorage'

export const KEY = 'recently-viewed'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }], plugin },
}

export const RecentlyViewed = new VueStorefrontModule(moduleConfig)
