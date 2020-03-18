import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import TeaserState from '../types/TeaserState'

export const teaserStateKey = 'icmaaTeaser'
export const teaserStorageKey = 'teaser'

export const TeaserStore: Module<TeaserState, RootState> = {
  namespaced: true,
  state: {
    items: [],
    tags: []
  },
  getters,
  actions,
  mutations
}
