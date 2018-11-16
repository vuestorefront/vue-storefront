import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/store/types/RootState'
import CmsBlockState from '../../types/CmsBlockState'

export const cmsBlockModule: Module<CmsBlockState, RootState> = {
  namespaced: true,
  state: {
    cmsBlocks: [],
  },
  getters,
  actions,
  mutations
}