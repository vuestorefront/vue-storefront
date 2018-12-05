import * as types from './../store/mutation-types'

export function afterRegistration(Vue, config, store, isServer) {
  // Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
  const placeOrder = function () {
    Vue.prototype.$bus.$emit('checkout-do-placeOrder', {})
  }

  if (!Vue.prototype.$isServer) {
    // Update the methods
    Vue.prototype.$bus.$on('set-unique-payment-methods', methods => {
      store.commit('payment-backend-methods/' + types.SET_BACKEND_PAYMENT_METHODS, methods)
    })

    // Mount the info component when required.
    Vue.prototype.$bus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      let methods = store.state['payment-backend-methods'].methods
      if (methods !== null && methods.find(item => item.code === paymentMethodCode)) {
        // Register the handler for what happens when they click the place order button.
        Vue.prototype.$bus.$on('checkout-before-placeOrder', placeOrder)
      } else {
        // unregister the extensions placeorder handler
        Vue.prototype.$bus.$off('checkout-before-placeOrder', placeOrder)
      }
    })
  }
}



