import { module } from './store'
import { createModule } from '@vue-storefront/core/lib/module'

import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import { beforeEach } from './router/beforeEach'

export const KEY = 'url'
export const cacheStorage = initCacheStorage(KEY)

export const Url = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  router: { beforeEach }
})
