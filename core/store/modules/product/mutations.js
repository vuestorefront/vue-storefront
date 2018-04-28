import * as types from '../../mutation-types'
import EventBus from '../../lib/event-bus'

export default {
  [types.CATALOG_UPD_RELATED] (state, { key, items }) {
    state.related[key] = items
    EventBus.$emit('product-after-related', { key: key, items: items })
  },
  [types.CATALOG_UPD_PRODUCTS] (state, { products, append }) {
    if (append === false) {
      state.list = products
    } else {
      state.list.start = products.start
      state.list.perPage = products.perPage
      state.list.items = state.list.items.concat(products.items)
    }
  },
  [types.CATALOG_SET_PRODUCT_CURRENT] (state, product) {
    state.current = product
  },
  [types.CATALOG_SET_PRODUCT_ORIGINAL] (state, product) {
    state.original = product
    EventBus.$emit('product-after-original', { original: product })
  },
  [types.CATALOG_SET_PRODUCT_PARENT] (state, product) {
    state.parent = product
    EventBus.$emit('product-after-parent', { parent: product })
  },
  [types.CATALOG_RESET_PRODUCT] (state, productOriginal) {
    state.current = productOriginal || {}
    state.current_configuration = {}
    state.offlineImage = null
    state.parent = null
    state.current_options = {color: [], size: []}
    EventBus.$emit('product-after-reset', { })
  }
}
