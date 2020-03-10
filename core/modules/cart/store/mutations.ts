import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CartState from '../types/CartState'
import config from 'config'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import productsEquals from './../helpers/productsEquals'

const mutations: MutationTree<CartState> = {
  /**
   * Add product to cart
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.CART_ADD_ITEM] (state, { product }) {
    const record = state.cartItems.find(p => productsEquals(p, product))
    if (!record) {
      let item = {
        ...product,
        qty: parseInt(product.qty ? product.qty : 1)
      }
      EventBus.$emit('cart-before-add', { product: item })
      state.cartItems.push(item)
    } else {
      EventBus.$emit('cart-before-update', { product: record })
      record.qty += parseInt((product.qty ? product.qty : 1))
    }
  },
  [types.CART_SET_ITEMS_HASH] (state, hash = null) {
    state.cartItemsHash = hash
  },
  [types.CART_SET_SYNC] (state) {
    state.cartServerLastSyncDate = new Date().getTime()
  },
  [types.CART_SET_TOTALS_SYNC] (state) {
    state.cartServerLastTotalsSyncDate = new Date().getTime()
  },
  [types.CART_DEL_ITEM] (state, { product, removeByParentSku = true }) {
    EventBus.$emit('cart-before-delete', { items: state.cartItems })
    state.cartItems = state.cartItems.filter(p => !productsEquals(p, product) && (p.parentSku !== product.sku || removeByParentSku === false))
    EventBus.$emit('cart-after-delete', { items: state.cartItems })
  },
  [types.CART_DEL_NON_CONFIRMED_ITEM] (state, { product, removeByParentSku = true }) {
    EventBus.$emit('cart-before-delete', { items: state.cartItems })
    state.cartItems = state.cartItems.filter(p => (!productsEquals(p, product) && (p.parentSku !== product.sku || removeByParentSku === false)) || p.server_item_id/* it's confirmed if server_item_id is set */)
    EventBus.$emit('cart-after-delete', { items: state.cartItems })
  },
  [types.CART_UPD_ITEM] (state, { product, qty }) {
    const record = state.cartItems.find(p => productsEquals(p, product))

    if (record) {
      EventBus.$emit('cart-before-update', { product: record })
      record.qty = parseInt(qty)
      EventBus.$emit('cart-after-update', { product: record })
    }
  },
  [types.CART_UPD_ITEM_PROPS] (state, { product }) {
    let record = state.cartItems.find(p => (productsEquals(p, product) || (p.server_item_id && p.server_item_id === product.server_item_id)))
    if (record) {
      EventBus.$emit('cart-before-itemchanged', { item: record })
      Object.entries(product).forEach(([key, value]) => Vue.set(record, key, value))
      EventBus.$emit('cart-after-itemchanged', { item: record })
    }
  },
  [types.CART_UPD_SHIPPING] (state, shippingMethod) {
    state.shipping = shippingMethod
  },
  [types.CART_LOAD_CART] (state, storedItems) {
    state.cartItems = storedItems || []
    state.cartIsLoaded = true

    // EventBus.$emit('order/PROCESS_QUEUE', { config: config }) // process checkout queue
    EventBus.$emit('sync/PROCESS_QUEUE', { config }) // process checkout queue
    EventBus.$emit('application-after-loaded')
    EventBus.$emit('cart-after-loaded')
  },
  [types.CART_LOAD_CART_SERVER_TOKEN] (state, token) {
    state.cartServerToken = token
  },
  [types.CART_UPD_TOTALS] (state, { itemsAfterTotals, totals, platformTotalSegments }) {
    state.itemsAfterPlatformTotals = itemsAfterTotals
    state.platformTotals = totals
    state.platformTotalSegments = platformTotalSegments
    EventBus.$emit('cart-after-updatetotals', { platformTotals: totals, platformTotalSegments: platformTotalSegments })
  },
  [types.CART_UPD_PAYMENT] (state, paymentMethod) {
    state.payment = paymentMethod
  },
  [types.CART_TOGGLE_MICROCART] (state) {
    state.isMicrocartOpen = !state.isMicrocartOpen
  },
  [types.CART_UPDATE_BYPASS_COUNTER] (state, { counter }) {
    state.connectBypassCount = state.connectBypassCount + counter
  },
  [types.CART_ADDING_ITEM] (state, { isAdding }) {
    state.isAddingToCart = isAdding
  }
}

export default mutations
