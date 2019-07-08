import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export function afterRegistration ({ Vue, config, store, isServer }) {
  if (config.googleTagManager.id && !isServer) {
    const storeView = currentStoreView()
    const currencyCode = storeView.i18n.currencyCode

    const getProduct = (item) => {
      const { name, id, sku, priceInclTax: price, category, qty: quantity } = item
      let product = {
        name,
        id,
        sku,
        price
      }
      if (quantity) {
        product['quantity'] = quantity
      }
      if (category && category.length > 0) {
        product['category'] = category.slice(-1)[0].name
      }

      return product
    }

    store.subscribe(({ type, payload }, state) => {
      // Adding a Product to a Shopping Cart
      if (type === 'cart/cart/ADD') {
        Vue.gtm.trackEvent({
          event: 'addToCart',
          ecommerce: {
            currencyCode: currencyCode,
            add: {
              products: [getProduct(payload.product)]
            }
          }
        });
      }

      // Removing a Product from a Shopping Cart
      if (type === 'cart/cart/DEL') {
        Vue.gtm.trackEvent({
          event: 'removeFromCart',
          ecommerce: {
            remove: {
              products: [getProduct(payload.product)]
            }
          }
        });
      }

      // Measuring Views of Product Details
      if (type === 'product/product/SET_PRODUCT_CURRENT') {
        Vue.gtm.trackEvent({
          ecommerce: {
            detail: {
              'actionField': { 'list': '' }, // 'detail' actions have an optional list property.
              'products': [getProduct(payload)]
            }
          }
        });
      }

      // Measuring Purchases
      if (type === 'order/order/LAST_ORDER_CONFIRMATION') {
        const orderId = payload.confirmation.backendOrderId
        const products = payload.order.products.map(product => getProduct(product))
        store.dispatch(
          'user/getOrdersHistory',
          { refresh: true, useCache: false }
        ).then(() => {
          const orderHistory = state.user.orders_history
          const order = orderHistory.items.find((order) => order['entity_id'].toString() === orderId)
          if (order) {
            Vue.gtm.trackEvent({
              'ecommerce': {
                'purchase': {
                  'actionField': {
                    'id': orderId,
                    'affiliation': order.store_name,
                    'revenue': order.total_due,
                    'tax': order.tax_amount,
                    'shipping': order.shipping_amount,
                    'coupon': ''
                  },
                  'products': products
                }
              }
            })
          }
        })
      }
    })
  }
}
