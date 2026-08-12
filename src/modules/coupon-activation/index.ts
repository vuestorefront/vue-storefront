import { isServer } from '@vue-storefront/core/helpers'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'

import { registerCouponActivation } from './helpers/register-coupon-activation'

export const CouponActivationModule: StorefrontModule = function ({ store, router }) {
  if (isServer) {
    return
  }

  registerCouponActivation(store, router)
}
