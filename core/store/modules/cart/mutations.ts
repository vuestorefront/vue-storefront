import Vue from 'vue'
import { MutationTree } from 'vuex'
import rootStore from '../../'
import * as types from '../../mutation-types'
import CartState from './types/CartState'

const mutations: MutationTree<CartState> = {
  /**
   * Add product to cart
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.CART_ADD_ITEM] (state, { product }) {
    const record = state.cartItems.find(p => p.sku === product.sku)
    if (!record) {
      let item = {
        ...product,
        qty: product.qty ? product.qty : 1
      }
      Vue.prototype.$bus.$emit('cart-before-add', { product: item })
      state.cartItems.push(item)
    } else {
      record.qty += parseInt((product.qty ? product.qty : 1))
    }
  },
  [types.CART_SAVE] (state) {
    Vue.prototype.$bus.$emit('cart-before-save', { items: state.cartItems })
    state.cartSavedAt = Date.now()
  },
  [types.CART_DEL_ITEM] (state, { product }) {
    Vue.prototype.$bus.$emit('cart-before-delete', { items: state.cartItems })
    state.cartItems = state.cartItems.filter(p => p.sku !== product.sku && p.parentSku !== product.sku)
    Vue.prototype.$bus.$emit('cart-after-delete', { items: state.cartItems })
    state.cartSavedAt = Date.now()
  },
  [types.CART_UPD_ITEM] (state, { product, qty }) {
    const record = state.cartItems.find(p => p.sku === product.sku)

    if (record) {
      Vue.prototype.$bus.$emit('cart-before-update', { product: record })
      record.qty = qty
      Vue.prototype.$bus.$emit('cart-after-update', { product: record })
      state.cartSavedAt = Date.now()
    }
  },
  [types.CART_UPD_ITEM_PROPS] (state, { product }) {
    let record = state.cartItems.find(p => (p.sku === product.sku || (p.server_item_id && p.server_item_id === product.server_item_id)))
    if (record) {
      Vue.prototype.$bus.$emit('cart-before-itemchanged', { item: record })
      record = Object.assign(record, product)
      Vue.prototype.$bus.$emit('cart-after-itemchanged', { item: record })
    }
    state.cartSavedAt = Date.now()
  },
  [types.CART_UPD_SHIPPING] (state, shippingMethod) {
    state.shipping = shippingMethod
    state.cartSavedAt = Date.now()
  },
  [types.CART_LOAD_CART] (state, storedItems) {
    state.cartItems = storedItems || []
    state.cartIsLoaded = true
    state.cartSavedAt = Date.now()

    Vue.prototype.$bus.$emit('order/PROCESS_QUEUE', { config: rootStore.state.config }) // process checkout queue
    Vue.prototype.$bus.$emit('sync/PROCESS_QUEUE', { config: rootStore.state.config }) // process checkout queue
    Vue.prototype.$bus.$emit('application-after-loaded')
    Vue.prototype.$bus.$emit('cart-after-loaded')
  },
  [types.CART_LOAD_CART_SERVER_TOKEN] (state, token) {
    state.cartServerToken = token
  },
  [types.CART_UPD_TOTALS] (state, { itemsAfterTotals, totals, platformTotalSegments }) {
    state.itemsAfterPlatformTotals = itemsAfterTotals
    state.platformTotals = totals
    state.platformTotalSegments = platformTotalSegments
    Vue.prototype.$bus.$emit('cart-after-updatetotals', { platformTotals: totals, platformTotalSegments: platformTotalSegments })
  },
  [types.CART_UPD_PAYMENT] (state, paymentMethod) {
    state.payment = paymentMethod
    state.cartSavedAt = Date.now()
  }
}

export default mutations
