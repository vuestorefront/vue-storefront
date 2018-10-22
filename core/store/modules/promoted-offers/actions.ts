import { ActionTree } from 'vuex'
import RootState from '../../types/RootState'
import PromotedOffersState from './types/PromotedOffersState'

const actions: ActionTree<PromotedOffersState, RootState> = {
  updatePromotedOffers ({commit}, data) {
    commit('updatePromotedOffers', data)
  }
}

export default actions
