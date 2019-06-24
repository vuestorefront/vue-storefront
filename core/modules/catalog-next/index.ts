import { categoryModule } from './store/category'
import { createModule } from '@vue-storefront/core/lib/module'
import { afterRegistration } from './hooks/afterRegistration'

export const KEY = 'catalog-next'
export default createModule({
  key: KEY,
  store: { modules: [
    { key: 'category-next', module: categoryModule }
  ] },
  afterRegistration
})
