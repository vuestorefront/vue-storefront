import Vue from 'vue'
import VueGtm from 'vue-gtm'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { htmlDecode } from '@vue-storefront/core/filters'
import { isServer } from '@vue-storefront/core/helpers'
import { Store } from 'vuex'

export const isEnabled = (gtmId: string | null) => {
  return typeof gtmId === 'string' && gtmId.length > 0 && !isServer
}
export function afterRegistration (config, store: Store<any>) {
  if (isEnabled(config.googleTagManager.id)) {
    const GTM: VueGtm = (Vue as any).gtm

    const storeView = currentStoreView()
    const currencyCode = storeView.i18n.currencyCode

    const getShippingMethodTitle = (shippingMethod) => {
      const shippingMethods = store.getters['checkout/getShippingMethods']
      for (let i = 0; i < shippingMethods.length; i++) {
        if (
          shippingMethods[i].method_code === shippingMethod
        ) {
          return {
            method_title: shippingMethods[i].method_title,
            amount: shippingMethods[i].amount
          }
        }
      }
      return {
        method_title: '',
        amount: ''
      }
    }
    const getProduct = (item, list = null, cat = null, position = null) => {
      const { id, sku, category, parentSku: parent, options } = item
      let product = { id }
      const attributeMap: string[] | Record<string, any>[] = config.googleTagManager.product_attributes
      attributeMap.forEach(attribute => {
        const isObject = typeof attribute === 'object'
        let attributeField = isObject ? Object.keys(attribute)[0] : attribute
        let attributeName = isObject ? Object.values(attribute)[0] : attribute

        if (item.hasOwnProperty(attributeField)) {
          const value = item[attributeField]
          if (value) {
            product[attributeName] = htmlDecode(value.toString())
          }
        }
      })
      if (position) {
        product['position'] = position
      }
      if (list) {
        product['list'] = list
      }
      if (parent) {
        product['sku'] = parent
        product['id'] = parent
        if (options && options.length > 0) {
          product['variant'] = sku
          // product['variant'] = options.map((el) => { return el.value }).join(",")
        }
      }
      if (category && category.length > 0) {
        product['category'] = category.slice(-1)[0].name
      }
      if (cat) {
        product['category'] = cat
      }
      return product
    }

    const getProducts = (items, list = null, cat = null) => {
      let products = []
      items.forEach((i, index) => {
        products.push(getProduct(i, list, cat, index + 1))
      })
      return products
    }

    const getPromo = (item) => {
      const { name, id, creative, position } = item
      let promo = {
        name,
        id,
        creative,
        position
      }
      return promo
    }
    Vue.prototype.$bus.$on('checkout-before-shippingMethods', (payload) => {
      store.commit('google-tag-manager/SET_CHECKOUT_STEP', {
        products: store.getters['cart/getCartItems'],
        step: '1',
        option: store.state.user.current ? 'LoggedIn Checkout' : 'Guest Checkout'
      })
    })
    Vue.prototype.$bus.$on('checkout-after-personalDetails', (payload) => {
      store.commit('google-tag-manager/SET_CHECKOUT_OPTION', {
        step: '1',
        option: store.state.user.current ? 'LoggedIn Checkout' : 'Guest Checkout'
      })
      store.commit('google-tag-manager/SET_CHECKOUT_STEP', {
        products: store.getters['cart/getCartItems'],
        step: '2',
        option: ''
      })
    })
    Vue.prototype.$bus.$on('checkout-after-shippingMethodChanged', (payload) => {
      store.commit('google-tag-manager/SET_CHECKOUT_OPTION', {
        step: '2',
        option: 'Shipping: ' + (payload ? getShippingMethodTitle(payload.method_code).method_title : '')
      })
    })
    Vue.prototype.$bus.$on('checkout-after-shippingDetails', (payload) => {
      store.commit('google-tag-manager/SET_CHECKOUT_STEP', {
        products: store.getters['cart/getCartItems'],
        step: '3',
        option: ''
      })
    })
    Vue.prototype.$bus.$on('checkout-after-paymentDetails', (payload) => {
      store.commit('google-tag-manager/SET_CHECKOUT_OPTION', {
        step: '3',
        option: 'Payment: ' + (payload ? payload.paymentMethod : '')
      })
      store.commit('google-tag-manager/SET_CHECKOUT_STEP', {
        products: store.getters['cart/getCartItems'],
        step: '4',
        option: ''
      })
    })
    Vue.prototype.$bus.$on('order-before-placed', (payload) => {
      const totals = store.getters['cart/getTotals']
      const products = store.getters['cart/getCartItems'].map(product => getProduct(product))

      let orders = store.getters['google-tag-manager/order_details'] ? store.getters['google-tag-manager/order_details'] : []

      let newOrder = {
        total_due: totals.find((t) => t['code'].toString() === 'grand_total')['value'],
        tax_amount: totals.find((t) => t['code'].toString() === 'tax')['value'],
        shipping_amount: totals.find((t) => t['code'].toString() === 'shipping')['value'],
        coupon_code: store.getters['cart/getCoupon'] ? store.getters['cart/getCoupon']['code'] : '',
        cart_id: store.getters['cart/getCartToken'],
        products: products
      }

      orders[newOrder.cart_id] = newOrder
      store.commit('google-tag-manager/SET_ORDER_DETAILS', orders)
    })

    store.subscribe(({ type, payload }, state) => {
      // Measuring Views of Promo
      if (type === 'google-tag-manager/SET_PROMO_VIEW') {
        GTM.trackEvent({
          event: 'promotionView',
          ecommerce: {
            promoView: {
              promotions: [getPromo(payload.promo)]
            }
          }
        })
      }

      // Measuring Clicks of Promo
      if (type === 'google-tag-manager/SET_PROMO_CLICK') {
        GTM.trackEvent({
          event: 'promotionClick',
          ecommerce: {
            promoClick: {
              promotions: [getPromo(payload.promo)]
            }
          }
        })
      }

      // Adding a Product to a Shopping Cart
      if (type === 'cart/cart/ADD') {
        GTM.trackEvent({
          event: 'addToCart',
          ecommerce: {
            currencyCode: currencyCode,
            add: {
              products: [getProduct(payload.product)]
            }
          }
        })
      }

      // Removing a Product from a Shopping Cart
      if (type === 'cart/cart/DEL') {
        GTM.trackEvent({
          event: 'removeFromCart',
          ecommerce: {
            remove: {
              products: [getProduct(payload.product)]
            }
          }
        })
      }

      // Adding a Product to Wishlist
      if (type === 'google-tag-manager/ADD_PRODUCT_WISHLIST') {
        GTM.trackEvent({
          event: 'addToWishlist',
          ecommerce: {
            currencyCode: currencyCode,
            add: {
              products: [getProduct(payload.product)]
            }
          }
        })
      }

      // Adding a Product to Compare
      if (type === 'google-tag-manager/ADD_PRODUCT_COMPARE') {
        GTM.trackEvent({
          event: 'addToCompare',
          ecommerce: {
            currencyCode: currencyCode,
            add: {
              products: [getProduct(payload.product)]
            }
          }
        })
      }
      // Measuring Views of Product Lists

      if (type === 'google-tag-manager/SET_PRODUCT_LIST') {
        GTM.trackEvent({
          event: 'productImpression',
          eventLabel: htmlDecode(payload.label),
          ecommerce: {
            currencyCode: currencyCode,
            impressions: getProducts(payload.products, payload.list, payload.category)
          }
        })
      }

      // Measuring Views of Product Clicks
      if (type === 'google-tag-manager/SET_PRODUCT_CLICK') {
        GTM.trackEvent({
          event: 'productClick',
          eventLabel: 'Product: ' + getProduct(payload.product).id,
          ecommerce: {
            currencyCode: currencyCode,
            click: {
              actionField: { 'list': payload.list },
              products: [getProduct(payload.product, null, null, payload.position)]
            }
          }
        })
      }

      // Measuring Views of Product Details
      if (type === 'google-tag-manager/SET_PRODUCT_CURRENT') {
        GTM.trackEvent({
          event: 'productDetail',
          eventAction: 'View Product Detail',
          eventLabel: 'Product: ' + getProduct(payload.product).id,
          ecommerce: {
            currencyCode: currencyCode,
            detail: {
              actionField: { 'list': payload.list },
              products: [getProduct(payload.product, null, payload.category)]
            }
          }
        })
      }

      // Measuring Views of Cart
      if (type === 'google-tag-manager/SET_CART') {
        GTM.trackEvent({
          event: 'cart',
          eventLabel: 'Cart',
          ecommerce: {
            currencyCode: currencyCode,
            cart: {
              products: getProducts(payload.products)
            }
          }
        })
      }

      // Measuring Views of Checkout
      if (type === 'google-tag-manager/SET_CHECKOUT_STEP') {
        GTM.trackEvent({
          event: 'checkout',
          eventLabel: 'Checkout',
          ecommerce: {
            currencyCode: currencyCode,
            checkout: {
              actionField: { 'step': payload.step, 'option': payload.option },
              products: getProducts(payload.products)
            }
          }
        })
      }

      // Measuring Views of Checkout Option
      if (type === 'google-tag-manager/SET_CHECKOUT_OPTION') {
        GTM.trackEvent({
          event: 'checkoutOption',
          eventLabel: 'Checkout Option',
          ecommerce: {
            currencyCode: currencyCode,
            checkout_option: {
              actionField: {
                step: payload.step,
                option: payload.option
              }
            }
          }
        })
      }

      // Measuring Purchases
      if (type === 'order/orders/LAST_ORDER_CONFIRMATION') {
        const orderId = payload.confirmation.orderNumber
        const guestOrder = store.getters['google-tag-manager/order_details']
        if (guestOrder && guestOrder[payload.order.cart_id]) {
          GTM.trackEvent({
            event: 'purchase',
            eventLabel: 'Success Page',
            ecommerce: {
              currencyCode: currencyCode,
              purchase: {
                actionField: {
                  id: orderId,
                  affiliation: '',
                  revenue: guestOrder[payload.order.cart_id].total_due,
                  tax: guestOrder[payload.order.cart_id].tax_amount,
                  shipping: guestOrder[payload.order.cart_id].shipping_amount,
                  coupon: guestOrder[payload.order.cart_id].coupon_code
                },
                products: guestOrder[payload.order.cart_id].products
              }
            }
          })
          guestOrder[payload.order.cart_id] = ''
          store.commit('google-tag-manager/SET_ORDER_DETAILS', guestOrder)
        }
      }
    })
  }
}
