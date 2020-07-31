import { urlStore } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { beforeEachGuard } from './router/beforeEach'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const cacheStorage = StorageManager.init('url')

export const UrlModule: StorefrontModule = function ({ store, router }) {
  store.registerModule('url', urlStore)
  router.beforeEach(beforeEachGuard)
}
