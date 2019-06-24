import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import BlockState from '../../types/BlockState'

export const cmsBlockStorageKey = 'icmaa-cms-blocks'

export const blockModule: Module<BlockState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}
