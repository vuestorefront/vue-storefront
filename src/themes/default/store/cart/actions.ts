import * as types from './mutation-types'
import getCurrentConfigurationFromTotals from './helpers/getCurrentConfigurationFromTotals'

const actions = {
  async configureProduct (context, { product }) {
    if (product.type_id === 'simple') {
      const configuration = getCurrentConfigurationFromTotals(product)
      const parentProduct = await context.dispatch('product/findConfigurableParent', { product, configuration }, { root: true })
      return context.dispatch('cart/updateItem', { product: parentProduct }, { root: true })
    }

    return Promise.resolve()
  },
  openEditMode (context, { product, selectedOptions }) {
    context.commit(types.CART_OPEN_EDIT_MODE, { productId: product.id, qty: product.qty, selectedOptions })
  },
  editModeSetFilters ({ commit }, { filterOptions }) {
    commit(types.CART_EDIT_MODE_SET_FILTERS, { filterOptions })
  },
  editModeSetQty ({ commit }, { qty }) {
    commit(types.CART_EDIT_QTY, { qty })
  },
  closeEditMode ({ commit }) {
    commit(types.CART_CLOSE_EDIT_MODE)
  }
}

export default actions
