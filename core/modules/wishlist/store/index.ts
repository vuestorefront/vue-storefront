import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import RootState from '@vue-storefront/store/types/RootState'
import WishlistState from '../types/WishlistState'

export const module:Module<WishlistState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  actions,
  mutations
}

