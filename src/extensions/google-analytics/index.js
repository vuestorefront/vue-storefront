import extensionStore from './store'
import extensionRoutes from './router'
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import EventBus from 'src/event-bus'

const EXTENSION_KEY = 'google-analytics'

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes)
  store.registerModule(EXTENSION_KEY, extensionStore)
  console.log('Google Analytics extension registered')

  if (config.analytics.id) {
    Vue.use(VueAnalytics, {
      id: config.analytics.id,
      router,
      ecommerce: {
        enabled: true,
        enhanced: true
      }
    })
    EventBus.$on('order/ORDER_PLACED', event => {
      const order = event.order
      const ecommerce = app.$ga.ecommerce
      order.products.forEach(product => {
        ecommerce.addItem({
          id: product.id.toString(),
          name: product.name,
          sku: product.sku,
          category: product.category[0].name,
          price: product.price.toString(),
          quantity: product.qty.toString()
        })
      })
      ecommerce.send()
    })
  } else {
    console.log('Ensure google analytic account ID is defined in config')
  }

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}
