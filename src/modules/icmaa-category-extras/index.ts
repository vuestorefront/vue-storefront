import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { CategoryExtrasStore, categoryExtrasStateKey } from './store'

export const KEY = 'icmaa-category-extras'
export const cacheStorage = StorageManager.init(KEY)

export const IcmaaCategoryExtrasModule: StorefrontModule = function ({ store }) {
  store.registerModule(categoryExtrasStateKey, CategoryExtrasStore)
}
