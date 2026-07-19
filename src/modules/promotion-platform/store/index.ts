import { Module } from 'vuex'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state';
import PromotionPlatformState from '../types/PromotionPlatformState'

const storeModule: Module<PromotionPlatformState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export { storeModule as module }
