import * as types from 'src/store/mutation-types'
import EventBus from 'src/plugins/event-bus'
import config from 'config'

export default {
  /**
   * Add product to cart
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.CART_ADD_ITEM] (state, { product }) {
    const record = state.cartItems.find(p => p.sku === product.sku)
    if (!record) {
      state.cartItems.push({
        ...product,
        qty: product.qty ? product.qty : 1
      })
    } else {
      record.qty += (product.qty ? product.qty : 1)
    }
  },
  [types.CART_SAVE] (state) {
    state.cartSavedAt = new Date()
  },
  [types.CART_DEL_ITEM] (state, { product }) {
    state.cartItems = state.cartItems.filter(p => p.sku !== product.sku)
    state.cartSavedAt = new Date()
  },
  [types.CART_UPD_ITEM] (state, { product, qty }) {
    const record = state.cartItems.find(p => p.sku === product.sku)

    if (record) {
      record.qty = qty
      state.cartSavedAt = new Date()
    }
  },
  [types.CART_UPD_ITEM_PROPS] (state, { product }) {
    let record = state.cartItems.find(p => p.sku === product.sku)
    if (record) {
      record = Object.assign(record, product)
    }
    state.cartSavedAt = new Date()
  },
  [types.CART_UPD_SHIPPING] (state, { shippingMethod, shippingCost }) {
    state.shipping.cost = shippingCost
    state.shipping.code = shippingMethod
    state.cartSavedAt = new Date()
  },
  [types.CART_LOAD_CART] (state, storedItems) {
    state.cartItems = storedItems || []
    state.cartIsLoaded = true
    state.cartSavedAt = new Date()

    EventBus.$emit('order/PROCESS_QUEUE', { config: config }) // process checkout queue
    EventBus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue
    EventBus.$emit('application-after-loaded')
  },
  [types.CART_LOAD_CART_SERVER_TOKEN] (state, token) {
    state.cartServerToken = token
  }
}
