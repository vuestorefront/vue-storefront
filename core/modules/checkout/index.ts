import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { checkoutModule } from './store/checkout'
import { paymentModule } from './store/payment'
import { shippingModule } from './store/shipping'
import * as types from './store/checkout/mutation-types'
import { ORDER_ERROR_EVENT } from './types/OrderErrorEvent'

export const CheckoutModule: StorefrontModule = function ({ store }) {
  StorageManager.init('checkout')

  store.registerModule('shipping', shippingModule)
  store.registerModule('payment', paymentModule)
  store.registerModule('checkout', checkoutModule)

  store.subscribe((mutation, state) => {
    const type = mutation.type

    if (
      type.endsWith(types.CHECKOUT_SAVE_PERSONAL_DETAILS) ||
      type.endsWith(types.CHECKOUT_RESET_PERSONAL_DETAILS)
    ) {
      StorageManager.get('checkout').setItem('personal-details', state.checkout.personalDetails).catch((reason) => {
        Logger.error(reason)() // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.CHECKOUT_SAVE_SHIPPING_DETAILS) ||
      type.endsWith(types.CHECKOUT_UPDATE_PROP_VALUE) ||
      type.endsWith(types.CHECKOUT_RESET_SHIPPING_DETAILS)
    ) {
      StorageManager.get('checkout').setItem('shipping-details', state.checkout.shippingDetails).catch((reason) => {
        Logger.error(reason)() // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.CHECKOUT_SAVE_PAYMENT_DETAILS) ||
      type.endsWith(types.CHECKOUT_UPDATE_PAYMENT_DETAILS) ||
      type.endsWith(types.CHECKOUT_RESET_PAYMENT_DETAILS)
    ) {
      StorageManager.get('checkout').setItem('payment-details', state.checkout.paymentDetails).catch((reason) => {
        Logger.error(reason)() // it doesn't work on SSR
      }) // populate cache
    }
  });

  if (!isServer) {
    const onClearUserData = () => store.dispatch('checkout/resetDetails');
    EventBus.$on('clear-user-data', onClearUserData);
  }
}

export {
  ORDER_ERROR_EVENT
}
