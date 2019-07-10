import { StorefrontModule } from '@vue-storefront/module'
import { wishlistStore } from './store'
import { plugin } from './store/plugin'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

const KEY = 'wishlist'
export const cacheStorage = initCacheStorage(KEY)
export const WishlistModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule(KEY, wishlistStore)
  store.subscribe(plugin)
}
