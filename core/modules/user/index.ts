import { module } from './store'
import { createModule } from '@vue-storefront/core/lib/module'
import { beforeEach } from './router/beforeEach'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'

export const KEY = 'user'
export const User = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  beforeRegistration,
  afterRegistration,
  router: { beforeEach }
})
