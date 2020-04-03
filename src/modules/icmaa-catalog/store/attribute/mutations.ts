import { MutationTree } from 'vuex'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import AttributeState from '@vue-storefront/core/modules/catalog/types/AttributeState'
import * as types from '@vue-storefront/core/modules/catalog/store/attribute/mutation-types'

const mutations: MutationTree<AttributeState> = {
  /**
   * Store attributes by code in state and localForage
   * @param {} state
   * @param {Array} attributes
   */
  async [types.ATTRIBUTE_UPD_ATTRIBUTES] (state, { attrHashByCode, attrHashById }) {
    /**
     * Use `Object.assign()` because `Vue.set()` seems not to update the state if content changes.
     * Otherwise the attributes won't be updated after load.
     */
    state.list_by_code = Object.assign({}, state.list_by_code, attrHashByCode)
    state.list_by_id = Object.assign({}, state.list_by_id, attrHashById)
    EventBus.$emit('product-after-attributes-loaded')
  }
}

export default mutations
