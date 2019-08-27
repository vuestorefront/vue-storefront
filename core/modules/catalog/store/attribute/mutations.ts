import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import AttributeState from '../../types/AttributeState'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

const mutations: MutationTree<AttributeState> = {
  /**
   * Store attributes by code in state and localForage
   * @param {} state
   * @param {Array} attributes
   */
  async [types.ATTRIBUTE_UPD_ATTRIBUTES] (state, { attrHashByCode, attrHashById }) {
    Vue.set(state, 'list_by_code', attrHashByCode)
    Vue.set(state, 'list_by_id', attrHashById)
    EventBus.$emit('product-after-attributes-loaded')
  },
  [types.ATTRIBUTE_UPD_BLACKLIST] (state, blacklist) {
    state.blacklist = state.blacklist.concat(blacklist)
  }
}

export default mutations
