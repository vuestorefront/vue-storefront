
import { compareStore } from './store'
import { plugin } from './store/plugin'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const cacheStorage = StorageManager.init('compare')

export const CompareModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('compare', compareStore)
  store.subscribe(plugin)
}
