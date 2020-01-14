import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { extendStore } from '@vue-storefront/core/helpers'
import { cartHooks } from '@vue-storefront/core/modules/cart/hooks'

import { IcmaaExtendedCartStore } from './store'

export const IcmaaExtendedCartModule: StorefrontModule = function ({ store }) {
  extendStore('cart', IcmaaExtendedCartStore)

  cartHooks.beforeSync(data => {
    store.dispatch('cart/updateFreeCartItems', data.serverItems)
    return data
  })
}
