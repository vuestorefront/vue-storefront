import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CartState from './types/CartState'

const getters: GetterTree<CartState, RootState> = {
  isEditMode (state) {
    return state.editMode !== null
  },
  getEditingProductId (state, getters) {
    return getters.isEditMode && state.editMode.productId
  },
  getSelectedOptions (state, getters) {
    return getters.isEditMode && state.editMode.selectedOptions
  },
  getEditingQty (state, getters) {
    return getters.isEditMode && state.editMode.qty
  }
}

export default getters
