import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import CartState from './types/CartState'

export const module: Module<CartState, any> = {
  namespaced: true,
  state: {
    editMode: null
  },
  getters,
  actions,
  mutations
}
