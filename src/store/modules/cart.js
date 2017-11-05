import * as types from '../mutation-types'
import _ from 'lodash'

const store = {
  namespaced: true,
  state: {
    cartIsLoaded: false,
    shipping: { cost: 0, code: '' },
    payment: { cost: 0, code: '' },
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
          qty: 1
        })
      } else {
        record.qty++
      }
      console.log(state.cartItems)
    },
    [types.CART_DEL_ITEM] (state, { product }) {
      state.cartItems = state.cartItems.filter(p => p.id !== product.id)
    },
    [types.CART_UPD_ITEM] (state, { product, qty }) {
      const record = state.cartItems.find(p => p.id === product.id)
      record.qty = qty
    },
    [types.CART_UPD_SHIPPING] (state, { shippingMethod, shippingCost }) {
      state.shipping.cost = shippingCost
      state.shipping.code = shippingMethod
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
          return p.qty * p.price
        }),
        quantity: _.sumBy(state.cartItems, (p) => {
          return p.qty
        })
      }
    }
  },
  actions: {
    load (context) {
      const commit = context.commit
      const rootState = context.rootState
      const state = context.state

      if (!state.shipping.code) {
        state.shipping = rootState.shipping.methods.find((el) => { if (el.default === true) return el }) // TODO: use commit() instead of modifying the state in actions
      }
      if (!state.payment.code) {
        state.payment = rootState.payment.methods.find((el) => { if (el.default === true) return el })
      }
      global.db.cartsCollection.getItem('current-cart', (err, storedItems) => {
        if (err) throw new Error(err)
        commit(types.CART_LOAD_CART, storedItems)
      })
    },

    addItem ({ commit, dispatch }, product) {
      dispatch('stock/check', {}, {root: true}).then(result => {
        console.log(result)
        if (result.status === 'volatile') {
          /* eslint no-alert: "off" */
          /* eslint no-undef: "off" */
          alert('The system is not sure about the stock quantity (volatile). Product has been added to the cart for pre-reservation')
        }
        if (result.status === 'ok' || result.status === 'volatile') {
          commit(types.CART_ADD_ITEM, { product })
        }
      })
    },
    removeItem ({ commit }, product) {
      commit(types.CART_DEL_ITEM, { product })
    },
    updateQuantity ({ commit }, { product, qty }) {
      commit(types.CART_UPD_ITEM, { product, qty })
    },
    changeShippingMethod ({ commit }, { shippingMethod, shippingCost }) {
      commit(types.CART_UPD_SHIPPING, { shippingMethod, shippingCost })
    }
  }
}

export default store
