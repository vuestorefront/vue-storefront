import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'

import { IcmaaAttributeStore } from './store/attribute'

export const IcmaaExtendedCatalogModule: StorefrontModule = function () {
  extendStore('attribute', IcmaaAttributeStore)
}
