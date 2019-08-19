import { productModule } from './store/product'
import { attributeModule } from './store/attribute'
import { stockModule } from './store/stock'
import { taxModule } from './store/tax'
import { categoryModule } from './store/category'
import { createModule } from '@vue-storefront/core/lib/module'
import { beforeRegistration } from './hooks/beforeRegistration'

export const KEY = 'catalog'
export const Catalog = createModule({
  key: KEY,
  store: { modules: [
    { key: 'product', module: productModule },
    { key: 'attribute', module: attributeModule },
    { key: 'stock', module: stockModule },
    { key: 'tax', module: taxModule },
    { key: 'category', module: categoryModule }
  ] },
  beforeRegistration
})
