import * as types from './../store/mutation-types'

export function afterRegistration ({ Vue, config, store, isServer }) {
  let correctPaymentMethod = false

  // Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
  const placeOrder = () => {
    if (correctPaymentMethod) {
      Vue.prototype.$bus.$emit('checkout-do-placeOrder', {})
    }
  }

  if (!isServer) {
    // Update the methods
    Vue.prototype.$bus.$on('set-unique-payment-methods', methods => {
      store.commit('payment-backend-methods/' + types.SET_BACKEND_PAYMENT_METHODS, methods)
    })

    Vue.prototype.$bus.$on('checkout-before-placeOrder', placeOrder)

    // Mount the info component when required
    Vue.prototype.$bus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      let methods = store.state['payment-backend-methods'].methods
      if (methods !== null && methods.find(item => (item.code === paymentMethodCode && item.is_server_method === true))) {
        correctPaymentMethod = true
      } else {
        correctPaymentMethod = false
      }
    })
  }
}
