import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import RootState from '@vue-storefront/core/types/RootState'
import WishlistState from '../types/WishlistState'

export const wishlistStore: Module<WishlistState, RootState> = {
  namespaced: true,
  state: {
    loaded: false,
    items: []
  },
  actions,
  mutations,
  getters
}
