import * as types from './../store/checkout/mutation-types'

export function afterRegistration ({ Vue, config, store, isServer }) {
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
