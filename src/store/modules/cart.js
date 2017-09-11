import * as types from '../mutation-types'
import _ from 'lodash'

export default {
  state: {
    items: global.localDb.getItem('vue-storefront-cart') || '[]'
  },
  mutations: {
    /**
     * Add product to cart
     * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
     */
    [types.ADD_CART] (state, { product }) {
      const record = state.items.find(p => p.id === product.id)
      if (!record) {
        state.items.push({
          ...product,
          quantity: 1
        })
      } else {
        record.quantity++
      }
    },
    [types.DEL_CART] (state, { product }) {
      state.items = state.items.filter(p => p.id !== product.id)
    },
    [types.UPD_CART] (state, { product, quantity }) {
      const record = state.items.find(p => p.id === product.id)
      record.quantity = quantity
    }
  },
  getters: {
    totals (state) {
      return {
        subtotal: _.sumBy(state.items, (p) => {
          return p.quantity * p.price
        }),
        quantity: _.sumBy(state.items, (p) => {
          return p.quantity
        })
      }
    }
  },
  actions: {
    addToCart ({ commit }, product) {
      commit(types.ADD_CART, { product })
    },
    removeFromCart ({ commit }, product) {
      commit(types.DEL_CART, { product })
    },
    updateQuantity ({ commit }, { product, quantity }) {
      commit(types.UPD_CART, { product, quantity })
    }
  }
}
