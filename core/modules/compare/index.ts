import { module } from './store'
import { createModule } from '@vue-storefront/core/lib/module'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';
import { plugin } from './store/plugin'

export const KEY = 'compare'
export const cacheStorage = initCacheStorage(KEY)
export const Compare = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }], plugin },
  beforeRegistration,
  afterRegistration
})
