import InfoComponent from '../components/Info.vue'
import rootStore from '@vue-storefront/store'

export function afterRegistration({ Vue, config, store, isServer }) {
  // Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
  const placeOrder = function () {
    Vue.prototype.$bus.$emit('checkout-do-placeOrder', {})
  }

  if (!Vue.prototype.$isServer) {
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

    // Mount the info component when required.
    Vue.prototype.$bus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      let methods = store.state['payment-backend-methods'].methods
      let method = methods.find(item => (item.code === paymentMethodCode))
      if (paymentMethodCode === 'cashondelivery' && ((typeof method !== 'undefined' && !method.is_server_method) || typeof method === 'undefined') /* otherwise it could be a `payment-backend-methods` module */) {
        // Register the handler for what happens when they click the place order button.
        Vue.prototype.$bus.$on('checkout-before-placeOrder', placeOrder)

        // Dynamically inject a component into the order review section (optional)
        const Component = Vue.extend(InfoComponent)
        const componentInstance = (new Component())
        componentInstance.$mount('#checkout-order-review-additional')
      } else {
        // unregister the extensions placeorder handler
        Vue.prototype.$bus.$off('checkout-before-placeOrder', placeOrder)
      }
    })
  }
}
