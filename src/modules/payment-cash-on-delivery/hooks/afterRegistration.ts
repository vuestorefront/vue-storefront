import InfoComponent from '../components/Info.vue'
import rootStore from '@vue-storefront/core/store'

export function afterRegistration ({ Vue, config, store, isServer }) {
  // Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
  let correctPaymentMethod = false
  const placeOrder = () => {
    if (correctPaymentMethod) {
      Vue.prototype.$bus.$emit('checkout-do-placeOrder', {})
    }
  }
  // Update the methods
  let paymentMethodConfig = {
    'title': 'Cash on delivery',
    'code': 'cashondelivery',
    'cost': 0,
    'costInclTax': 0,
    'default': true,
    'offline': true,
    'is_server_method': false
  }
  rootStore.dispatch('payment/addMethod', paymentMethodConfig)
  if (!isServer) {
    Vue.prototype.$bus.$on('checkout-before-placeOrder', placeOrder)

    // Mount the info component when required.
    Vue.prototype.$bus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      let methods = store.state['payment-backend-methods'].methods
      if (methods) {
        let method = methods.find(item => (item.code === paymentMethodCode))
        if (paymentMethodCode === 'cashondelivery' && ((typeof method !== 'undefined' && !method.is_server_method) || typeof method === 'undefined') /* otherwise it could be a `payment-backend-methods` module */) {
          correctPaymentMethod = true

          // Dynamically inject a component into the order review section (optional)
          const Component = Vue.extend(InfoComponent)
          const componentInstance = (new Component())
          componentInstance.$mount('#checkout-order-review-additional')
        } else {
          correctPaymentMethod = false
        }
      }
    })
  }
}
