import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'

import { CompetitionsStore, competitionsStateKey, competitionsStorageKey } from './store'
import moduleRoutes from './routes'

export const cacheStorage = StorageManager.init(competitionsStorageKey)

export const IcmaaCompetitionsModule: StorefrontModule = async function ({ store, appConfig, router }) {
  store.registerModule(competitionsStateKey, CompetitionsStore)
  setupMultistoreRoutes(appConfig, router, moduleRoutes, 10)
}
