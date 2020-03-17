import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { checkoutModule } from './store/checkout'
import { paymentModule } from './store/payment'
import { shippingModule } from './store/shipping'
import * as types from './store/checkout/mutation-types'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const CheckoutModule: StorefrontModule = function ({ store }) {
  StorageManager.init('checkout')

  store.registerModule('shipping', shippingModule)
  store.registerModule('payment', paymentModule)
  store.registerModule('checkout', checkoutModule)

  store.subscribe((mutation, state) => {
    const type = mutation.type

    if (
      type.endsWith(types.CHECKOUT_SAVE_PERSONAL_DETAILS)
    ) {
      StorageManager.get('checkout').setItem('personal-details', state.checkout.personalDetails).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.CHECKOUT_SAVE_SHIPPING_DETAILS) || type.endsWith(types.CHECKOUT_UPDATE_PROP_VALUE)
    ) {
      StorageManager.get('checkout').setItem('shipping-details', state.checkout.shippingDetails).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.CHECKOUT_SAVE_PAYMENT_DETAILS)
    ) {
      StorageManager.get('checkout').setItem('payment-details', state.checkout.paymentDetails).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    }
  })
}
