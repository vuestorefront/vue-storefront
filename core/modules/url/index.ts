import { module } from './store'
import UrlDispatcher from './pages/UrlDispatcher.vue'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
export const KEY = 'url'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  beforeRegistration,
  afterRegistration,
  router: { routes: [
    { name: 'urldispatcher', path: '*', component: UrlDispatcher }
  ] }
}

export const Url = new VueStorefrontModule(moduleConfig)
