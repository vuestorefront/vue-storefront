import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { TeaserStore, teaserStateKey } from './store'

export const KEY = 'icmaa-teaser'
export const cacheStorage = StorageManager.init(KEY)

export const IcmaaTeaserModule: StorefrontModule = function ({ store }) {
  store.registerModule(teaserStateKey, TeaserStore)
}
