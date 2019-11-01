import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import TwitterState from '../types/TwitterState'

const mutations: MutationTree<TwitterState> = {
  [types.SN_ICMAA_TWITTER_ADD_STATUS] (state, { screenName, status }) {
    if (!state.status.find(s => s.screenName === screenName)) {
      state.status.push({ screenName, status })
    }
  }
}

export default mutations
