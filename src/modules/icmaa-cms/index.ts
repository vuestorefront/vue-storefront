import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { blockModule } from './store/block'

const KEY = 'icmaa-cms'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: {
    modules: [
      { key: 'icmaaCmsBlock', module: blockModule }
    ]
  }
}

export const IcmaaCms = new VueStorefrontModule(moduleConfig)
