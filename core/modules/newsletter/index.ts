import { newsletterStore } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const NewsletterModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  StorageManager.init('newsletter')
  store.registerModule('newsletter', newsletterStore)
}
