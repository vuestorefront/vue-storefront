import * as types from '../../mutation-types'

export default {
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
}
