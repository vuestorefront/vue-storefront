import { createModule } from '@vue-storefront/core/lib/module'
import { module } from './store'

const KEY = 'policies'
export const StorePolicies = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
})
