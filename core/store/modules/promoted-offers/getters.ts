import { GetterTree } from 'vuex'
import RootState from '../../types/RootState'
import PromotedOffersState from './types/PromotedOffersState'

const getters: GetterTree<PromotedOffersState, RootState> = {
  getPromotedOffers: state => {
    return state.banners
  }
}

export default getters
