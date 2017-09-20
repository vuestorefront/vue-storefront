import * as types from '../mutation-types'
import _ from 'lodash'

const store = {
  namespaced: true,
  state: {
    cartIsLoaded: false,
    cartItems: [] // TODO: check if it's properly namespaced
  },
  mutations: {
    /**
     * Add product to cart
     * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
     */
    [types.CART_ADD_ITEM] (state, { product }) {
      const record = state.cartItems.find(p => p._id === product._id)
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
    loadCart ({ commit }) {
      global.localDb.getItem('vue-storefront-cart', (err, storedItems) => {
        if (err) throw new Error(err)
        commit(types.CART_LOAD_CART, storedItems)
      })
    },

    addToCart ({ commit }, product) {
      commit(types.CART_ADD_ITEM, { product })
    },
    removeFromCart ({ commit }, product) {
      commit(types.CART_DEL_ITEM, { product })
    },
    updateQuantity ({ commit }, { product, quantity }) {
      commit(types.CART_UPD_ITEM, { product, quantity })
    }
  },

  plugins: [
    store => {
      store.subscribe((mutation, { store }) => {
        if (mutation.indexOf(types.SN_CART) === 0) { // check if this mutation is cart related
          global.localDb.setItem('vue-storefront-cart', store.cartItems, (err) => {
            if (err) throw new Error(err)
          })
        }
      })
    }
  ]
}

export default store
