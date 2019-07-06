import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import PageState from '../../types/PageState'

export const cmsPageStateKey = 'icmaaCmsPage'
export const cmsPageStorageKey = 'pages'

export const pageModule: Module<PageState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}
