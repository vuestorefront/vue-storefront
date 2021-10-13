import { Module } from 'vuex'
import { mutations } from './mutations'
// import { getters } from './getters'
import { actions } from './actions'
import { state } from './state';
import PromotionPlatformState from '../types/PromotionPlatformState'

export const module: Module<PromotionPlatformState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
//   getters
}
