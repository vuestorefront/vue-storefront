import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { AdviceStore, adviceStateKey } from './store'

export const KEY = 'icmaa-advice'
export const cacheStorage = StorageManager.init(KEY)

export const IcmaaAdviceModule: StorefrontModule = function ({ store }) {
  store.registerModule(adviceStateKey, AdviceStore)
}
