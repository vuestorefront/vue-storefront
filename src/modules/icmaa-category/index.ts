import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { CategoryModule } from './store'

const KEY = 'icmaa-category'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: {
    modules: [
      { key: 'icmaaCategory', module: CategoryModule }
    ]
  }
}

export const IcmaaCategory = new VueStorefrontModule(moduleConfig)
