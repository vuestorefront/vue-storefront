import { cmsPageModule } from './store/page'
import { cmsBlockModule } from './store/block'
import { cmsHierarchyModule } from './store/hierarchy'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { plugin } from './store/plugin'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';

export const KEY = 'cms'
export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: 'cmsPage', module: cmsPageModule },
    { key: 'cmsBlock', module: cmsBlockModule },
    { key: 'cmsHierarchy', module: cmsHierarchyModule }
  ], plugin },
}

export const Cms = new VueStorefrontModule(moduleConfig)