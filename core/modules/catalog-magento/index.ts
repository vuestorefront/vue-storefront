// import { productModule } from './store/product'
// import { attributeModule } from './store/attribute'
// import { stockModule } from './store/stock'
// import { taxModule } from './store/tax'
import { categoryModule } from './store/category'
import { createModule } from '@vue-storefront/core/lib/module'
// import { beforeRegistration } from './hooks/beforeRegistration'

export const KEY = 'catalog-magento'
export default createModule({
  key: KEY,
  store: { modules: [
    { key: 'category-magento', module: categoryModule }
  ] }
})
