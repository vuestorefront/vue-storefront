import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { BlockStore, cmsBlockStateKey } from './store/block'
import { PageStore, cmsPageStateKey } from './store/page'
import { CategoryExtrasStore, cmsCategoryExtrasStateKey } from './store/category-extras'

export const KEY = 'icmaa-cms'
export const cacheStorage = StorageManager.init(KEY)

export const IcmaaCmsModule: StorefrontModule = function ({ store }) {
  store.registerModule(cmsBlockStateKey, BlockStore)
  store.registerModule(cmsPageStateKey, PageStore)
  store.registerModule(cmsCategoryExtrasStateKey, CategoryExtrasStore)
}
