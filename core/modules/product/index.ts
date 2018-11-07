import { productModule } from './store/product'
import { attributeModule } from './store/attribute'
import { stockModule } from './store/stock'
import { taxModule } from './store/tax'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'

export const KEY = 'product'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: KEY, module: productModule },
    { key: 'attribute', module: attributeModule },
    { key: 'stock', module: stockModule },
    { key: 'tax', module: taxModule }
  ] },
}

export const Product = new VueStorefrontModule(moduleConfig)