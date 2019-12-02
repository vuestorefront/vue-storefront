import { createModule } from '@vue-storefront/core/lib/module'
import { module } from './store'

const KEY = 'procc'
export const ProCCStore = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
})
