import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import { beforeEach } from './router/beforeEach'
import { afterRegistration } from './hooks/afterRegistration'

export const KEY = 'url'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  router: { beforeEach },
  afterRegistration
}
export const Url = new VueStorefrontModule(moduleConfig)
