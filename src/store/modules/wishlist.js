import * as types from '../mutation-types'
import EventBus from 'src/event-bus/event-bus'

const store = {
  namespaced: true,
  state: {
    wishlist: false,
    itemsWishlist: []
  },
  mutations: {
    /**
    * Add product to Wishlist
    * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
    */
    [types.WISH_ADD_ITEM] (state, { product }) {
      console.log('---> ', product)
      const record = state.itemsWishlist.find(p => p.sku === product.sku)
      if (!record) {
        state.itemsWishlist.push(product)
      }
    },
    [types.WISH_DEL_ITEM] (state, { product }) {
      state.itemsWishlist = state.itemsWishlist.filter(p => p.sku !== product.sku)
    },
    [types.WISH_LOAD_WISH] (state, storedItems) {
      state.itemsWishlist = storedItems || []
      state.wishlist = true
    }
  },
  getters: {
    check (state) {
      return {
        isOnWishlist: (product) => {
          return state.itemsWishlist.find(p => p.sku === product.sku)
        }
      }
    }
  },
  actions: {
    clear (context) {
      context.commit(types.WISH_LOAD_WISH, [])
    },
    load (context) {
      const commit = context.commit
      console.log(global.db.wishlistCollection)
      global.db.wishlistCollection.getItem('current-wishlist', (err, storedItems) => {
        if (err) throw new Error(err)
        commit(types.WISH_LOAD_WISH, storedItems)
      })
    },
    addItem ({ commit }, product) {
      commit(types.WISH_ADD_ITEM, { product })
      EventBus.$emit('notification', {
        type: 'success',
        message: `Product ${product.name} has been added to the wishlist!`,
        action1: { label: 'OK', action: 'close' }
      })
    },
    removeItem ({ commit }, product) {
      commit(types.WISH_DEL_ITEM, { product })
      EventBus.$emit('notification', {
        type: 'success',
        message: `Product ${product.name} has been removed`,
        action1: { label: 'OK', action: 'close' }
      })
    }
  }
}

export default store
