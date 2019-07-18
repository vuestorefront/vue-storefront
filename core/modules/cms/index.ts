import { cmsPageModule } from './store/page'
import { cmsBlockModule } from './store/block'
import { cmsHierarchyModule } from './store/hierarchy'
import { plugin } from './store/plugin'
import { StorefrontModule } from '@vue-storefront/module';
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export const cacheStorage = StorageManager.init('cms')

export const CmsModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('cmsPage', cmsPageModule)
  store.registerModule('cmsBlock', cmsBlockModule)
  store.registerModule('cmsHierarchy', cmsHierarchyModule)
  store.subscribe(plugin)
}
