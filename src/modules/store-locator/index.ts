import { createModule } from '@vue-storefront/core/lib/module'
import { module } from './store'

export const KEY = 'storeLocator'
export const StoreLocator = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
})
