import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import SearchAliasState from '../../types/SearchAliasState'

export const stateKey = 'icmaaSearchAlias'
export const storageKey = 'search-alias'

export const SearchAliasStore: Module<SearchAliasState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}
