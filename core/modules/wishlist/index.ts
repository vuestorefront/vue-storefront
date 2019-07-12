import { StorefrontModule } from '@vue-storefront/module'
import { wishlistStore } from './store'
import { plugin } from './store/plugin'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const cacheStorage = initCacheStorage('wishlist')
export const WishlistModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('wishlist', wishlistStore)
  store.subscribe(plugin)
}
