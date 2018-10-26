import { Module } from 'vuex'
import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'

export const module: Module<any, any> = {
  actions: {
    toggleMicrocart ({commit, state}, open) {
      let shouldVisible = typeof open !== 'undefined' ? open : !state.microCartOpen
      commit('ui/setOverlay', shouldVisible, {root: true})
      commit(types.CART_SET_MICROCART, shouldVisible)
    }
  }
}
