import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import CmsPageState from '../../types/CmsPageState'

export const cmsPagesStorageKey = 'cms-page'

export const cmsPageModule: Module<CmsPageState, RootState> = {
  namespaced: true,
  state: {
    items: [],
    current: null
  },
  getters,
  actions,
  mutations
}
