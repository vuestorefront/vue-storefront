import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import RootState from '../../types/RootState'
import PromotedOffersState from './types/PromotedOffersState'

const promotedOffers: Module<PromotedOffersState, RootState> = {
  namespaced: true,
  state: {
    banners: {
      mainBanners: [],
      smallBanners: [],
      productBanners: []
    }
  },
  getters,
  actions,
  mutations
}

export default promotedOffers
