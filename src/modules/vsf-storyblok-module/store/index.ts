import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'
import { StoryblokState } from '../types/State'

export const module: Module<StoryblokState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {
    supportsWebp (state: StoryblokState) {
      return state.supportsWebp
    }
  }
}
