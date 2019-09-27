import config from 'config'

import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'

import { beforeEachGuard } from './router/beforeEach'
import moduleRoutes from './routes'

export const KEY = 'external-checkout'

export const IcmaaExternalCheckout: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  router.beforeEach(beforeEachGuard)
  setupMultistoreRoutes(config, router, moduleRoutes, 10)
}
