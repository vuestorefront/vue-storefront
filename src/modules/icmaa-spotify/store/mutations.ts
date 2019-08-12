import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import SpotifyState from '../types/SpotifyState'

const mutations: MutationTree<SpotifyState> = {
  [types.ICMAA_SPOTIFY_RELATEDARTIST_ADD] (state, payload) {
    if (!state.relatedArtists[payload.categoryId]) {
      Vue.set(state.relatedArtists, payload.categoryId, payload.relatedArtists)
    }
  }
}

export default mutations
