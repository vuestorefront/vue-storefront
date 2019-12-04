import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { RecommendationsStore, storageKey, stateKey } from './store'

export const cacheStorage = StorageManager.init(storageKey)

export const IcmaaRecommendationsModule: StorefrontModule = function ({ store }) {
  store.registerModule(stateKey, RecommendationsStore)
}
