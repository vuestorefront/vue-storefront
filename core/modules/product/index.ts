import { productModule } from './store/product'
import { attributeModule } from './store/attribute'
import { stockModule } from './store/stock'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'

export const KEY = 'product'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: KEY, module: productModule },
    { key: 'attribute', module: attributeModule },
    { key: 'stock', module: stockModule }
  ] },
}

export const Product = new VueStorefrontModule(moduleConfig)