import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import CmsBlockState from '../../types/CmsBlockState'

export const cmsBlockStorageKey = 'cms-blocks'

export const cmsBlockModule: Module<CmsBlockState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}
