import * as types from '../mutation-types'
import EventBus from 'src/event-bus/event-bus'

const state = {
  wishlist: false,
  wishedItems: []
}

// Mutations
const mutations = {
  /**
  * Add product to cart
  * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
  */
  [types.WISH_ADD_ITEM] (state, { product }) {
    const record = state.wishedItems.find(p => p.sku === product.sku)
    if (!record) {
      state.wishedItems.push({
        ...product
      })
    }
  },
  [types.WISH_DEL_ITEM] (state, { product }) {
    state.wishedItems = state.wishedItems.filter(p => p.sku !== product.sku)
  },
  [types.WISH_LOAD_PANE] (state, storedItems) {
    state.wishedItems = storedItems || []
    state.wishlist = true
  }
}

const getters = {
}

// Actions
const actions = {
  clear (context) {
    context.commit(types.WISH_LOAD_PANE, [])
  },
  load (context) {
    const commit = context.commit
    global.db.wishlistCollection.getItem('current-wishlist', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.WISH_LOAD_PANE, storedItems)
    })
  },
  getItem (product) {
    return state.wishedItems.find(p => p.sku === product.sku)
  },
  addItem ({ commit }, product) {
    commit(types.WISH_ADD_ITEM, { product })
    EventBus.$emit('notification', {
      type: 'success',
      message: 'Product has been added to the wishlist!',
      action1: { label: 'OK', action: 'close' }
    })
  },
  removeItem ({ commit }, product) {
    commit(types.WISH_DEL_ITEM, { product })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
