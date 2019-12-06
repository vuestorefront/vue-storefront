import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'

import { ExtendedReviewStore } from './store'
import moduleRoutes from './routes'

export const IcmaaExtendedReviewModule: StorefrontModule = function () {
  extendStore('review', ExtendedReviewStore)
}

export const IcmaaExtendedReviewRoutes: StorefrontModule = function ({ router, appConfig }) {
  setupMultistoreRoutes(appConfig, router, moduleRoutes, 10)
}
