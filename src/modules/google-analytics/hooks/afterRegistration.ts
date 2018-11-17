import VueAnalytics from 'vue-analytics'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

export function afterRegistration(Vue, config) {
    if (config.analytics.id && !Vue.prototype.$isServer) {
        EventBus.$on('order/ORDER_PLACED', event => {
            const order = event.order
            const ecommerce = Vue.$ga.ecommerce
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
    }
}
