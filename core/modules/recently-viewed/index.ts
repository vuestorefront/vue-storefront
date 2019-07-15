import { recentlyViewedStore } from './store'
import { plugin } from './store/plugin'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import { StorefrontModule } from '@vue-storefront/module';
import { isServer } from '@vue-storefront/core/helpers'

export const cacheStorage = initCacheStorage('recently-viewed')
export const RecentlyViewedModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('recently-viewed', recentlyViewedStore)
  store.subscribe(plugin)

  if (!isServer) store.dispatch('recently-viewed/load')
}
