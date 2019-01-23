import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import PromotedOffersState from '../types/PromotedOffersState'

const actions: ActionTree<PromotedOffersState, RootState> = {
  async updatePromotedOffers ({commit, rootState}, data) {
    let promotedBannersResource = rootState.storeView && rootState.storeView.storeCode ? `banners/${rootState.storeView.storeCode}_promoted_offers` : `promoted_offers`
    try {
      const promotedOffersModule = await import(/* webpackChunkName: "vsf-promoted-offers-[request]" */ `theme/resource/${promotedBannersResource}.json`)
      commit('updatePromotedOffers', promotedOffersModule)
    } catch (err) {
      console.debug('Unable to load promotedOffers', err)
    }
  },
  async updateHeadImage ({commit, rootState}, data) {
    let mainImageResource = rootState.storeView && rootState.storeView.storeCode ? `banners/${rootState.storeView.storeCode}_main-image` : `main-image`
    try {
      const imageModule = await import(/* webpackChunkName: "vsf-head-img-[request]" */ `theme/resource/${mainImageResource}.json`)
      rootState.storeView.headImage = imageModule.image // TODO after multistore refactor should be an action
    } catch (err) {
      console.debug('Unable to load headImage', err)
    }
  }
}

export default actions
