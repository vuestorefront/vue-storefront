import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { TwitterStore } from './store'

export const KEY = 'icmaa-twitter'
export const cacheStorage = StorageManager.init(KEY)

export const IcmaaTwitterModule: StorefrontModule = function ({ store }) {
  store.registerModule('icmaaTwitter', TwitterStore)
}
