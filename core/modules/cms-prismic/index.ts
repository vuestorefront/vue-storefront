import { cmsBlockModule } from './store/block'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { plugin } from './store/plugin'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';

export const KEY = 'prismic'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: 'prismic', module: cmsBlockModule },
  ], plugin },
}

export const Prismic = new VueStorefrontModule(moduleConfig)
