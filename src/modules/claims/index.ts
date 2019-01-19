import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { beforeRegistration } from './hooks/beforeRegistration'
import { module } from './store'

const KEY = 'claims'

export const Claims = new VueStorefrontModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }]},
  beforeRegistration
}) 