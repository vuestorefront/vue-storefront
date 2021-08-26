import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { wishlistStore } from './store'
import whishListPersistPlugin from './store/whishListPersistPlugin'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const WishlistModule: StorefrontModule = function ({ store }) {
  StorageManager.init('wishlist')
  store.registerModule('wishlist', wishlistStore)
  store.subscribe(whishListPersistPlugin)
}
