import { Module } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import PaymentState from '../../types/PaymentState'

export const paymentModule: Module<PaymentState, RootState> = {
  namespaced: true,
  state: {
    methods: [{"code":"cashondelivery","title":"Cash On Delivery","is_server_method":true}]
  },
  mutations: {
    addMethod (state, paymentMethod) {
      state.methods.push(paymentMethod)
    },
    replaceMethods (state, paymentMethods) {
      state.methods = paymentMethods
    }
  },
  actions: {
    addMethod ({commit}, paymentMethod) {
      commit('addMethod', paymentMethod)
    },
    replaceMethods ({commit}, paymentMethods) {
      commit('replaceMethods', paymentMethods)
    }
  },
  getters: {
    paymentMethods (state) {
      return state.methods
    }
  }
}
