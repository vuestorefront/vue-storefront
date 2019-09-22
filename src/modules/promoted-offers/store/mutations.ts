import { MutationTree } from 'vuex'
import PromotedOffersState from '../types/PromotedOffersState'

const mutations: MutationTree<PromotedOffersState> = {
  updatePromotedOffers (state, data) {
    state.banners = data
  },
  SET_HEAD_IMAGE (state, headImage) {
    state.headImage = headImage
  }
}

export default mutations
