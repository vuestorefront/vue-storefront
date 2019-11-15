import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'

import { ExtendedNewsletterStore } from './store'

export const IcmaaExtendedNewsletterModule: StorefrontModule = function () {
  extendStore('newsletter', ExtendedNewsletterStore)
}
