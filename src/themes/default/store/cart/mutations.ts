import * as types from './mutation-types'
import { MutationTree } from 'vuex'
import CartState from './types/CartState'

const mutations: MutationTree<CartState> = {
  [types.CART_OPEN_EDIT_MODE] (state, { productId, selectedOptions, qty }) {
    state.editMode = { productId, selectedOptions, qty }
  },
  [types.CART_EDIT_MODE_SET_FILTERS] (state, { filterOptions }) {
    state.editMode.selectedOptions[filterOptions.type] = filterOptions
  },
  [types.CART_EDIT_QTY] (state, { qty }) {
    state.editMode.qty = qty
  },
  [types.CART_CLOSE_EDIT_MODE] (state) {
    state.editMode = null
  }
}

export default mutations
