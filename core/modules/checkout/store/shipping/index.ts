import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ShippingState from '../../types/ShippingState'
import { Logger } from '@vue-storefront/core/lib/logger'

// @deprecated
export const shippingModule: Module<ShippingState, RootState> = {
  namespaced: true,
  actions: {
    addMethod ({ dispatch }, shippingMethod) {
      Logger.error('The action shipping/addMethod has been deprecated please change to checkout/addShippingMethod')()
      dispatch('checkout/addShippingMethod', shippingMethod, { root: true })
    },
    replaceMethods ({ dispatch }, shippingMethods) {
      Logger.error('The action shipping/replaceMethods has been deprecated please change to checkout/replaceShippingMethods')()
      dispatch('checkout/replaceShippingMethods', shippingMethods, { root: true })
    }
  },
  getters: {
    // @deprecated
    shippingMethods: (state, getters, rootState, rootGetters) => rootGetters['checkout/getShippingMethods'],
    // @deprecated
    getShippingMethods: (state, getters, rootState, rootGetters) => rootGetters['checkout/getShippingMethods'],
    // @deprecated
    getDefaultShippingMethod: (state, getters, rootState, rootGetters) => rootGetters['checkout/getDefaultShippingMethod']
  }
}
