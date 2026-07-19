import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { mutations } from './mutations'
import { actions } from './actions'
import getters from './getters'
import { state } from './state'
import { StoryblokState } from '../types/State'

const storeModule: Module<StoryblokState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export { storeModule as module }
