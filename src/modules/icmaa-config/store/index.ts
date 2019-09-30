import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ConfigState from '../types/ConfigState'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const ExtendedConfigStore: Module<ConfigState, RootState> = {
  namespaced: true,
  state: {
    map: []
  },
  actions,
  getters,
  mutations
}
