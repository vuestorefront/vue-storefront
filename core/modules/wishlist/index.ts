import { StorefrontModule } from '@vue-storefront/module'
import { wishlistStore } from './store'
import { plugin } from './store/plugin'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export const cacheStorage = StorageManager.init('wishlist')

export const WishlistModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('wishlist', wishlistStore)
  store.subscribe(plugin)
}
