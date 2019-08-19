import { module } from './store'
import { createModule } from '@vue-storefront/core/lib/module'

export const KEY = 'breadcrumbs'
export const Breadcrumbs = createModule({
  key: KEY,
  store: { modules: [
    { key: KEY, module: module }
  ] }
})
