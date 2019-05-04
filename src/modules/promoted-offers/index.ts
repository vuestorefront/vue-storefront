import { createModule } from '@vue-storefront/core/lib/module'
import { module } from './store'

const KEY = 'promoted'
export const PromotedOffers = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
})