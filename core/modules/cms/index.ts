import { cmsPageModule } from './store/page'
import { cmsBlockModule } from './store/block'
import { cmsHierarchyModule } from './store/hierarchy'
import cmsPersistPlugin from './store/cmsPersistPlugin'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const CmsModule: StorefrontModule = function ({ store }) {
  StorageManager.init('cms')
  store.registerModule('cmsPage', cmsPageModule)
  store.registerModule('cmsBlock', cmsBlockModule)
  store.registerModule('cmsHierarchy', cmsHierarchyModule)
  store.subscribe(cmsPersistPlugin)
}
