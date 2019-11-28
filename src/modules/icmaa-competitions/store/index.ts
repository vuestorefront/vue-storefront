import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CompetitionsState from '../types/CompetitionsState'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const competitionsStateKey = 'icmaaCompetitions'
export const competitionsStorageKey = 'icmaa-competitions'

export const CompetitionsStore: Module<CompetitionsState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  actions,
  getters,
  mutations
}
