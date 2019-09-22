import { module } from './store'
import { plugin } from './store/plugin'
import { createModule } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import { afterRegistration } from './hooks/afterRegistration'

export const KEY = 'recently-viewed'
export const cacheStorage = initCacheStorage(KEY)
export const RecentlyViewed = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }], plugin },
  afterRegistration
})
