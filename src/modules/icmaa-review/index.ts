import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'

import { ExtendedReviewStore } from './store'

export const IcmaaExtendedReviewModule: StorefrontModule = function () {
  extendStore('review', ExtendedReviewStore)
}
