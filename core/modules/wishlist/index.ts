import { module } from './store'
import { plugin } from './store/plugin'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'
import { initCacheStorage } from '../initCacheStorage'

export const KEY = 'wishlist'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { module, plugin }
}

export const Wishlist = new VueStorefrontModule(moduleConfig)