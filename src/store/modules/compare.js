import * as types from '../mutation-types'
import EventBus from 'src/event-bus'
import { htmlDecode } from '../../lib/filters'

const store = {
  namespaced: true,
  state: {
    compare: false,
    itemsCompare: []
  },
  mutations: {
    /**
     * Add product to Compare
     * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
     */
    [types.COMPARE_ADD_ITEM] (state, {product}) {
      const record = state.itemsCompare.find(p => p.sku === product.sku)
      if (!record) {
        state.itemsCompare.push({
          ...product
        })
        state.compare = true
      }
    },
    [types.COMPARE_DEL_ITEM] (state, {product}) {
      state.itemsCompare = state.itemsCompare.filter(p => p.sku !== product.sku)
      state.compare = state.itemsCompare.length > 0
    },
    [types.COMPARE_LOAD_COMPARE] (state, storedItems) {
      state.itemsCompare = storedItems || []
      state.compare = state.itemsCompare.length > 0
    }
  },
  getters: {
    check (state) {
      return {
        isOnCompare: (product) => {
          let item = state.itemsCompare.find(p => p.sku === product.sku)
          return (item !== undefined)
        }
      }
    }
  },
  actions: {
    load (context) {
      const commit = context.commit
      global.db.compareCollection.getItem('current-compare', (err, storedItems) => {
        if (err) throw new Error(err)
        commit(types.COMPARE_LOAD_COMPARE, storedItems)
      })
    },
    addItem ({commit}, product) {
      commit(types.COMPARE_ADD_ITEM, {product})
      EventBus.$emit('notification', {
        type: 'success',
        message: `Product ${htmlDecode(product.name)} has been added to the compare!`,
        action1: {label: 'OK', action: 'close'}
      })
    },
    removeItem ({commit}, product) {
      commit(types.COMPARE_DEL_ITEM, {product})
      EventBus.$emit('notification', {
        type: 'success',
        message: `Product ${htmlDecode(product.name)} has been removed from compare!`,
        action1: {label: 'OK', action: 'close'}
      })
    }
  }
}

export default store
