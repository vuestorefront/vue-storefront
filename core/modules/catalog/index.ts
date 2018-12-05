import { productModule } from './store/product'
import { attributeModule } from './store/attribute'
import { stockModule } from './store/stock'
import { taxModule } from './store/tax'
import { categoryModule } from './store/category'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'

export const KEY = 'catalog'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: 'product', module: productModule },
    { key: 'attribute', module: attributeModule },
    { key: 'stock', module: stockModule },
    { key: 'tax', module: taxModule },
    { key: 'category', module: categoryModule }
  ] },
}

export const Catalog = new VueStorefrontModule(moduleConfig)