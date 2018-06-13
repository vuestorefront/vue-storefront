import EventBus from 'core/plugins/event-bus'

import extensionRoutes from './router'

const EXTENSION_KEY = 'payment-backend-methods'

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  import(/* webpackChunkName: "store-backend-methods" */'./store').then(extensionStore => {
    store.registerModule(EXTENSION_KEY, extensionStore) // add custom store
  })

  app.$on('application-after-init', () => {
    console.debug(EXTENSION_KEY + ' extension initialised')
  })

  // Mount the info component when required.
  EventBus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
    if (app.$store.state['payment-backend-methods'].methods.find(item => item.code === paymentMethodCode)) {
      // Register the handler for what happens when they click the place order button.
      EventBus.$on('checkout-before-placeOrder', placeOrder)
    } else {
      // unregister the extensions placeorder handler
      EventBus.$off('checkout-before-placeOrder', placeOrder)
    }
  })

  return { EXTENSION_KEY, extensionRoutes }
}

// Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
function placeOrder () {
  EventBus.$emit('checkout-do-placeOrder', {})
}
