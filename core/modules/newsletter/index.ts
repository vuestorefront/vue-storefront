import { newsletterStore } from './store'
import { StorefrontModule } from '@vue-storefront/module';
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export const cacheStorage = StorageManager.init('newsletter')

export const NewsletterModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('newsletter', newsletterStore)
}
