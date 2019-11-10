import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import StorePoliciesState from '../types/StorePoliciesState'
import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<StorePoliciesState, RootState> = {
  async updateStorePolicies ({commit, rootState}, data) {
    let StorePoliciesResource = rootState.storeView && rootState.storeView.storeCode ? `policies/${rootState.storeView.storeCode}_store_policies` : `store_policies`
    try {
      const storePoliciesModule = await import(/* webpackChunkName: "vsf-store-policies-[request]" */ `theme/resource/${StorePoliciesResource}.json`)
      commit('updateStorePolicies', storePoliciesModule)
    } catch (err) {
      Logger.debug('Unable to load StorePolicies' + err)()
    }
  }
}

export default actions
