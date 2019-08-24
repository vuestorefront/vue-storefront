import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import PaymentState from '../../types/PaymentState'
import { Logger } from '@vue-storefront/core/lib/logger'

// @deprecated
export const paymentModule: Module<PaymentState, RootState> = {
  namespaced: true,
  actions: {
    addMethod ({ dispatch }, paymentMethod) {
      Logger.error('The action payment/addMethod has been deprecated please change to checkout/addPaymentMethod')()

      dispatch('checkout/addPaymentMethod', paymentMethod, { root: true })
    },
    replaceMethods ({ dispatch }, paymentMethods) {
      Logger.error('The action payment/replaceMethods has been deprecated please change to checkout/replacePaymentMethods')()

      dispatch('checkout/replacePaymentMethods', paymentMethods, { root: true })
    }
  },
  getters: {
    paymentMethods: (state, getters, rootState, rootGetters) => {
      Logger.error('The getter payment/paymentMethods has been deprecated please change to checkout/getPaymentMethods')()

      return rootGetters['checkout/getPaymentMethods']
    },
    getDefaultPaymentMethod: (state, getters, rootState, rootGetters) => {
      Logger.error('The getter payment/getDefaultPaymentMethod has been deprecated please change to checkout/getDefaultPaymentMethod')()

      return rootGetters['checkout/getDefaultPaymentMethod']
    },
    getNotServerPaymentMethods: (state, getters, rootState, rootGetters) => {
      Logger.error('The getter payment/getNotServerPaymentMethods has been deprecated please change to checkout/getNotServerPaymentMethods')()

      return rootGetters['checkout/getNotServerPaymentMethods']
    }
  }
}
