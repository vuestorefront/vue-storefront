import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '../../types/RootState'
import WishlistState from './types/WishlistState'

const wishlist: Module<WishlistState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}

export default wishlist
