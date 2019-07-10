import { recentlyViewedStore } from './store'
import { plugin } from './store/plugin'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import { StorefrontModule } from '@vue-storefront/module';
import { isServer } from '@vue-storefront/core/helpers'

const KEY = 'recently-viewed'
export const cacheStorage = initCacheStorage(KEY)
export const RecentlyViewedModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule(KEY, recentlyViewedStore)
  store.subscribe(plugin)

  if (!isServer) store.dispatch('recently-viewed/load')
}
