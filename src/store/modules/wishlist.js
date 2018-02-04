import * as types from '../mutation-types'
import EventBus from 'src/event-bus'
import { htmlDecode } from '../../lib/filters'
import i18n from 'lib/i18n'

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
      const record = state.itemsWishlist.find(p => p.sku === product.sku)
      if (!record) {
        state.itemsWishlist.push({
          ...product,
          qty: 1
        })
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
          let item = state.itemsWishlist.find(p => p.sku === product.sku)
          return (item !== undefined)
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
      global.db.wishlistCollection.getItem('current-wishlist', (err, storedItems) => {
        if (err) throw new Error(err)
        commit(types.WISH_LOAD_WISH, storedItems)
      })
    },
    addItem ({ commit }, product) {
      commit(types.WISH_ADD_ITEM, { product })
      EventBus.$emit('notification', {
        type: 'success',
        message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
        action1: { label: 'OK', action: 'close' }
      })
    },
    removeItem ({ commit }, product) {
      commit(types.WISH_DEL_ITEM, { product })
      EventBus.$emit('notification', {
        type: 'success',
        message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(product.name) }),
        action1: { label: 'OK', action: 'close' }
      })
    }
  }
}

export default store
