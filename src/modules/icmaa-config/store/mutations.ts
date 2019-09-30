import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import ConfigState from '../types/ConfigState'

const mutations: MutationTree<ConfigState> = {
  [types.ICMAA_CONFIG_ADD_MAP] (state, payload) {
    state.map = payload
  }
}

export default mutations
