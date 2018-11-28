import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { afterRegistration } from './hooks/afterRegistration'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';
import { plugin } from './store/plugin'

export const KEY = 'compare'

export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }], plugin },
  afterRegistration
}

export const Compare = new VueStorefrontModule(moduleConfig)
