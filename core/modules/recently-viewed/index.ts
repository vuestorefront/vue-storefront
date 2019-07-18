import { recentlyViewedStore } from './store'
import { plugin } from './store/plugin'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { StorefrontModule } from '@vue-storefront/module';
import { isServer } from '@vue-storefront/core/helpers'

export const cacheStorage = StorageManager.init('recently-viewed')

export const RecentlyViewedModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('recently-viewed', recentlyViewedStore)
  store.subscribe(plugin)

  if (!isServer) store.dispatch('recently-viewed/load')
}
