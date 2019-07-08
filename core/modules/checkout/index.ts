import { StorefrontModule } from '@vue-storefront/module'
import { checkoutModule } from './store/checkout'
import { paymentModule } from './store/payment'
import { shippingModule } from './store/shipping'
import Vue from 'vue'
import * as types from './store/checkout/mutation-types'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const CheckoutModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  Vue.prototype.$db.checkoutFieldsCollection = initCacheStorage('checkoutFieldValues')

  store.registerModule('shipping', shippingModule)
  store.registerModule('payment', paymentModule)
  store.registerModule('checkout', checkoutModule)

    store.subscribe((mutation, state) => {
      const type = mutation.type

      if (
        type.endsWith(types.CHECKOUT_SAVE_PERSONAL_DETAILS)
      ) {
        Vue.prototype.$db.checkoutFieldsCollection.setItem('personal-details', state.checkout.personalDetails).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }

      if (
        type.endsWith(types.CHECKOUT_SAVE_SHIPPING_DETAILS)
      ) {
        Vue.prototype.$db.checkoutFieldsCollection.setItem('shipping-details', state.checkout.shippingDetails).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }

      if (
        type.endsWith(types.CHECKOUT_SAVE_PAYMENT_DETAILS)
      ) {
        Vue.prototype.$db.checkoutFieldsCollection.setItem('payment-details', state.checkout.paymentDetails).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
    })
}
