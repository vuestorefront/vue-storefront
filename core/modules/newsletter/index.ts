import { newsletterStore } from './store'
import { StorefrontModule } from '@vue-storefront/module';
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const cacheStorage = initCacheStorage('newsletter')
export const NewsletterModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('newsletter', newsletterStore)
}
