import Vue from 'vue'
import VueAnalytics from 'vue-analytics'


export function afterRegistration (app, config) {
  console.debug('Google Analytics extension registered')

  if (config.analytics.id && !Vue.prototype.$isServer) {
    Vue.use(VueAnalytics, {
      id: config.analytics.id,
      ecommerce: {
        enabled: true,
        enhanced: true
      }
    })
    Vue.prototype.bus.$on('order/ORDER_PLACED', event => {
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
    console.log('Ensure Google Analytics account ID is defined in config')
  }
}
