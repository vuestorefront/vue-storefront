import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import StoreDataState from '../types/StoreDataState'
import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<StoreDataState, RootState> = {
  async updateStoreCategories ({commit, rootState}, data) {
    let storeCategoriesBannersResource = rootState.storeView && rootState.storeView.storeCode ? `banners/${rootState.storeView.storeCode}_store_categories` : `store_categories`
    try {
      const storeCategoriesModule = await import(/* webpackChunkName: "vsf-promoted-offers-[request]" */ `theme/resource/${storeCategoriesBannersResource}.json`)
      commit('updateStoreCategories', storeCategoriesModule)
    } catch (err) {
      Logger.debug('Unable to load Store Category On Home' + err)()
    }
  },
  async updateHeadImage ({commit, rootState}, data) {
    let mainImageResource = rootState.storeView && rootState.storeView.storeCode ? `banners/${rootState.storeView.storeCode}_main-image` : `main-image`
    try {
      const imageModule = await import(/* webpackChunkName: "vsf-head-img-[request]" */ `theme/resource/${mainImageResource}.json`)
      commit('SET_HEAD_IMAGE', imageModule.image)
    } catch (err) {
      Logger.debug('Unable to load headImage' + err)()
    }
  }
}

export default actions
