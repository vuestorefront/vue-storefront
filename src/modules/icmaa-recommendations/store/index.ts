import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import RecommendationsState from '../types/RecommendationsState'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const stateKey = 'icmaaRecommendations'
export const storageKey = 'recommendations'

export const RecommendationsStore: Module<RecommendationsState, RootState> = {
  namespaced: true,
  state: {
    list: []
  },
  actions,
  getters,
  mutations
}
