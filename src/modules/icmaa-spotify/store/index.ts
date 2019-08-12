import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import SpotifyState from '../types/SpotifyState'

export const SpotifyStore: Module<SpotifyState, RootState> = {
  namespaced: true,
  state: {
    relatedArtists: {}
  },
  getters,
  actions,
  mutations
}
