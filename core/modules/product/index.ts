import { productModule } from './store'
import { attributeModule } from './store/attribute'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'

export const KEY = 'product'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: KEY, module: productModule },
    { key: 'attribute', module: attributeModule }
  ] },
}

export const Product = new VueStorefrontModule(moduleConfig)