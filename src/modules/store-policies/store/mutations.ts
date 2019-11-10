import { MutationTree } from 'vuex'
import StorePoliciesState from '../types/StorePoliciesState'

const mutations: MutationTree<StorePoliciesState> = {
  updateStorePolicies (state, data) {
    state.policies = data
  },
  SET_POLICIES (state, policies) {
    state.policies = policies
  }
}

export default mutations
