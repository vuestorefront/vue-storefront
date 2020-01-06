import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import StorePoliciesState from '../types/StorePoliciesState'

const getters: GetterTree<StorePoliciesState, RootState> = {
  getStorePolicies: state => {
    return state.policies
  }
}

export default getters
