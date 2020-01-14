import { Module } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import CartState from '@vue-storefront/core/modules/cart//types/CartState'
import { cartStore } from '@vue-storefront/core/modules/cart/store/index'

export const IcmaaExtendedCartStore: Module<CartState, any> = {
  state: Object.assign(cartStore.state, {
    freeCartItems: []
  }),
  actions,
  getters,
  mutations
}
