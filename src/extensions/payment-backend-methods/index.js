import extensionStore from './store'
import extensionRoutes from './router'
import EventBus from '../../../core/plugins/event-bus'

const EXTENSION_KEY = 'payment-backend-methods'

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store

  app.$on('application-after-init', () => {
    console.log(EXTENSION_KEY + ' extension initialised')
  })

  // Mount the info component when required.
  EventBus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
    if (app.$store.state['payment-backend-methods'].methods.find(item => item.code === paymentMethodCode)) {
      // Register the handler for what happens when they click the place order button.
      EventBus.$on('checkout-before-placeOrder', placeOrder)
    } else {
      // unregister the extensions placeorder handler
      EventBus.$off('checkout-before-placeOrder')
    }
  })

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}

// Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
function placeOrder () {
  EventBus.$emit('checkout-do-placeOrder', {})
}
