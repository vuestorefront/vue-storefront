import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import StoreCategoriesState from '../types/StoreCategoriesState'

export const module: Module<StoreCategoriesState, RootState> = {
  namespaced: true,
  state: {
    banners: {
      mainBanners: [],
      smallBanners: [],
      productBanners: []
    },
    headImage: null
  },
  getters,
  actions,
  mutations
}
