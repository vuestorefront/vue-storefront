
import { compareStore } from './store'
import cachePersistPlugin from './store/plugin'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const CompareModule: StorefrontModule = function ({ store }) {
  StorageManager.init('compare')
  store.registerModule('compare', compareStore)
  store.subscribe(cachePersistPlugin)
}
