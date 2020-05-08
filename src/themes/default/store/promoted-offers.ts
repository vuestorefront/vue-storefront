import { Logger } from '@vue-storefront/core/lib/logger'

export default interface PromotedOffersState {
  banners: {
    mainBanners: any[],
    smallBanners: any[],
    productBanners: any[]
  },
  headImage: Record<string, any>
}

export const promotedStore = {
  namespaced: true,
  state: {
    banners: {
      mainBanners: [],
      smallBanners: [],
      productBanners: []
    },
    headImage: null
  },
  getters: {
    getPromotedOffers: state => {
      return state.banners
    },
    getHeadImage: state => state.headImage
  },
  actions: {
    async updatePromotedOffers ({ commit, rootState }, data) {
      let promotedBannersResource = rootState.storeView && rootState.storeView.storeCode ? `banners/${rootState.storeView.storeCode}_promoted_offers` : `promoted_offers`
      try {
        // Workaround to get jest --watch to work so don't change the import sting to a template string
        const promotedOffersModule = await import(/* webpackChunkName: "vsf-promoted-offers-[request]" */ 'theme/resource/' + promotedBannersResource + '.json')
        commit('updatePromotedOffers', promotedOffersModule)
      } catch (err) {
        Logger.debug('Unable to load promotedOffers' + err)()
      }
    },
    async updateHeadImage ({ commit, rootState }, data) {
      let mainImageResource = rootState.storeView && rootState.storeView.storeCode ? `banners/${rootState.storeView.storeCode}_main-image` : `main-image`
      try {
        // Workaround to get jest --watch to work so don't change the import sting to a template string
        const imageModule = await import(/* webpackChunkName: "vsf-head-img-[request]" */ 'theme/resource/' + mainImageResource + '.json')
        commit('SET_HEAD_IMAGE', imageModule.image)
      } catch (err) {
        Logger.debug('Unable to load headImage' + err)()
      }
    }
  },
  mutations: {
    updatePromotedOffers (state, data) {
      state.banners = data
    },
    SET_HEAD_IMAGE (state, headImage) {
      state.headImage = headImage
    }
  }
}
