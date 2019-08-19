// Read more about modules: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md
import { module } from './store'
import { plugin } from './store/plugin'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
import { createModule } from '@vue-storefront/core/lib/module'
import { beforeEach } from './router/beforeEach'
import { afterEach } from './router/afterEach'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const KEY = 'example'
export const cacheStorage = initCacheStorage(KEY)
export const Example = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }], plugin },
  beforeRegistration,
  afterRegistration,
  router: { beforeEach, afterEach }
}
)
