import VueAnalytics from 'vue-analytics'

export function afterRegistration(Vue, config) {
    if (config.analytics.id && !Vue.prototype.$isServer) {
        Vue.prototype.$bus.$on('order/ORDER_PLACED', event => {
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
