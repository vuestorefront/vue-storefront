import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { blockModule, cmsBlockStateKey } from './store/block'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';

export const KEY = 'icmaa-cms'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: {
    modules: [
      { key: cmsBlockStateKey, module: blockModule }
    ]
  }
}

export const IcmaaCms = new VueStorefrontModule(moduleConfig)
