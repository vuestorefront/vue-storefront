import { Module } from 'vuex'
import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'

export const module: Module<any, any> = {
  actions: {
    toggleMicrocart ({commit, state}) {
      commit('ui/setOverlay', !state.microCartOpen, {root: true})
      commit(types.CART_SET_MICROCART, !state.microCartOpen)
    }
  }
}
