import * as types from './store/mutation-types'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

const PaymentBackendMethodsStore = {
  namespaced: true,
  state: {
    methods: null
  },
  mutations: {
    [types.SET_BACKEND_PAYMENT_METHODS] (state, paymentMethods) {
      state.methods = paymentMethods
    }
  }
}

export const PaymentBackendMethodsModule: StorefrontModule = function ({ store }) {
  store.registerModule('payment-backend-methods', PaymentBackendMethodsStore)

  let correctPaymentMethod = false

  // Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
  const placeOrder = () => {
    if (correctPaymentMethod) {
      EventBus.$emit('checkout-do-placeOrder', {})
    }
  }

  if (!isServer) {
    // Update the methods
    EventBus.$on('set-unique-payment-methods', methods => {
      store.commit('payment-backend-methods/' + types.SET_BACKEND_PAYMENT_METHODS, methods)
    })

    EventBus.$on('checkout-before-placeOrder', placeOrder)

    // Mount the info component when required
    EventBus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      let methods = store.state['payment-backend-methods'].methods
      if (methods !== null && methods.find(item => (item.code === paymentMethodCode && item.is_server_method === true))) {
        correctPaymentMethod = true
      } else {
        correctPaymentMethod = false
      }
    })
  }
}
