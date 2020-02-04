import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { FormsStore, formsStateKey, formsStorageKey } from './store'

export const KEY = formsStorageKey
export const cacheStorage = StorageManager.init(formsStorageKey)

export const IcmaaFormsModule: StorefrontModule = function ({ store }) {
  store.registerModule(formsStateKey, FormsStore)
}
