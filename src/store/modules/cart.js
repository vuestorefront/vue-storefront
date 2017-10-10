import * as types from '../mutation-types'
import _ from 'lodash'

const store = {
  namespaced: true,
  state: {
    cartIsLoaded: false,
    shipping: { cost: 15, method: 'carrier' },
    payment: { method: 'cod' },
    cartItems: [] // TODO: check if it's properly namespaced
  },
  mutations: {
    /**
     * Add product to cart
     * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
     */
    [types.CART_ADD_ITEM] (state, { product }) {
      const record = state.cartItems.find(p => p.id === product.id)
      if (!record) {
        state.cartItems.push({
          ...product,
          quantity: 1
        })
      } else {
        record.quantity++
      }
      console.log(state.cartItems)
    },
    [types.CART_DEL_ITEM] (state, { product }) {
      state.cartItems = state.cartItems.filter(p => p.id !== product.id)
    },
    [types.CART_UPD_ITEM] (state, { product, quantity }) {
      const record = state.cartItems.find(p => p.id === product.id)
      record.quantity = quantity
    },
    [types.CART_UPD_SHIPPING] (state, { shippingMethod, shippingCost }) {
      state.shipping.cost = shippingCost
      state.shipping.method = shippingMethod
    },
    [types.CART_LOAD_CART] (state, storedItems) {
      state.cartItems = storedItems || []
      state.cartIsLoaded = true
    }
  },
  getters: {
    totals (state) {
      return {
        subtotal: _.sumBy(state.cartItems, (p) => {
          return p.quantity * p.price
        }),
        quantity: _.sumBy(state.cartItems, (p) => {
          return p.quantity
        })
      }
    }
  },
  actions: {
    load ({ commit }) {
      global.db.cartsCollection.getItem('current-cart', (err, storedItems) => {
        if (err) throw new Error(err)
        commit(types.CART_LOAD_CART, storedItems)
      })
    },

    addItem ({ commit }, product) {
      commit(types.CART_ADD_ITEM, { product })
    },
    removeItem ({ commit }, product) {
      commit(types.CART_DEL_ITEM, { product })
    },
    updateQuantity ({ commit }, { product, quantity }) {
      commit(types.CART_UPD_ITEM, { product, quantity })
    },
    changeShippingMethod ({ commit }, { shippingMethod, shippingCost }) {
      commit(types.CART_UPD_SHIPPING, { shippingMethod, shippingCost })
    }
  }
}

export default store
