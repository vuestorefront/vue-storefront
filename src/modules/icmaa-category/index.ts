import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import { CategoryStore } from './store'
import moduleRoutes from './routes'

export const IcmaaCategoryModule: StorefrontModule = function ({ store, router, appConfig }) {
  store.registerModule('icmaaCategory', CategoryStore)
  setupMultistoreRoutes(appConfig, router, moduleRoutes, 10)
}
