import { urlStore } from './store'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import { StorefrontModule } from '@vue-storefront/module'
import { beforeEachGuard } from './router/beforeEach'

export const KEY = 'url'
export const cacheStorage = initCacheStorage(KEY)
export const UrlModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule(KEY, urlStore)
  router.beforeEach(beforeEachGuard)
}
