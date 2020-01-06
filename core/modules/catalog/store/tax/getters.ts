import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import TaxState from '../../types/TaxState'

const getters: GetterTree<TaxState, RootState> = {
  getRules: (state) => state.rules,
  getUserTaxGroupId: (state, getters, rootState) => {
    if (!getters.getIsUserGroupedTaxActive) return

    const storeViewTax = rootState.storeView.tax
    const currentUser = rootState.user.current

    if (storeViewTax.useOnlyDefaultUserGroupId || !currentUser) {
      return storeViewTax.userGroupId
    }

    return currentUser.group_id
  },
  getIsUserGroupedTaxActive: (state, getters, rootState) => {
    return typeof rootState.storeView.tax.userGroupId === 'number'
  }
}

export default getters
