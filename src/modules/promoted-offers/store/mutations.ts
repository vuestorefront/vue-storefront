import { MutationTree } from 'vuex'
import PromotedOffersState from '../types/PromotedOffersState'

const mutations: MutationTree<PromotedOffersState> = {
  updatePromotedOffers (state, data) {
    state.banners = data
  }
}

export default mutations
