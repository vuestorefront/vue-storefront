import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import AdviceState from '../types/AdviceState'

export const adviceStateKey = 'icmaaAdvice'
export const adviceStorageKey = 'advice'

export const AdviceStore: Module<AdviceState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}
