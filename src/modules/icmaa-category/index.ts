import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import { CategoryStore } from './store'
import moduleRoutes from './routes'

const KEY = 'icmaa-category'

export const IcmaaCategoryModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('icmaaCategory', CategoryStore)
  setupMultistoreRoutes(appConfig, router, moduleRoutes, 10)
}
