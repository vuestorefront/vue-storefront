import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import GiftcertState from '../types/GiftcertState'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const GiftcertStore: Module<GiftcertState, RootState> = {
  namespaced: true,
  state: {
    number: '',
    expires: '',
    balance: -1,
    currency: ''
  },
  getters,
  actions,
  mutations
}
