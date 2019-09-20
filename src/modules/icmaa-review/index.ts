import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'

import { ExtendedReviewStore } from './store'

export const IcmaaExtendedReviewModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  extendStore('review', ExtendedReviewStore)
}
