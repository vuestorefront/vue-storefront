import { createModule } from '@vue-storefront/core/lib/module'
import { module } from './store'

const KEY = 'categories'
export const StoreCategories = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
})
