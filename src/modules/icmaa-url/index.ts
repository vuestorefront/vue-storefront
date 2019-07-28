import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'

import { ExtendedUrlStore } from './store'

export const IcmaaExtendedUrlModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  extendStore('url', ExtendedUrlStore)
}
