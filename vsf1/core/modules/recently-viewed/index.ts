import { recentlyViewedStore } from './store'
import { plugin } from './store/plugin'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { isServer } from '@vue-storefront/core/helpers'

export const cacheStorage = StorageManager.init('recently-viewed')

export const RecentlyViewedModule: StorefrontModule = function ({ store }) {
  store.registerModule('recently-viewed', recentlyViewedStore)
  store.subscribe(plugin)

  if (!isServer) store.dispatch('recently-viewed/load')
}
