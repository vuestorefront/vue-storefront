import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import RootState from '../../types/RootState'
import OrderState from './types/OrderState'

const order: Module<OrderState, RootState> = {
  namespaced: true,
  state: {
  },
  actions,
  mutations
}

export default order
