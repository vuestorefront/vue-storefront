import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { blockModule, cmsBlockStateKey } from './store/block'
import { beforeRegistration } from './hooks/beforeRegistration'

export const KEY = 'icmaa-cms'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: {
    modules: [
      { key: cmsBlockStateKey, module: blockModule }
    ]
  },
  beforeRegistration
}

export const IcmaaCms = new VueStorefrontModule(moduleConfig)
