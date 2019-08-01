import Vue from 'vue'
import { MutationTree } from 'vuex'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'
import * as types from './mutation-types'
import AttributeState from '../../types/AttributeState'
import { Logger } from '@vue-storefront/core/lib/logger'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import config from 'config'

const mutations: MutationTree<AttributeState> = {
  /**
   * Store attributes by code in state and localForage
   * @param {} state
   * @param {Array} attributes
   */
  async [types.ATTRIBUTE_UPD_ATTRIBUTES] (state, attributes) {
    let attrList = attributes.items // extract fields from ES _source
    let attrHashByCode = state.list_by_code
    let attrHashById = state.list_by_id

    for (let attr of attrList) {
      attrHashByCode[attr.attribute_code] = attr
      attrHashById[attr.attribute_id] = attr

      if (!config.attributes.disablePersistentAttributesCache) {
        const attrCollection = StorageManager.get('attributes')
        try {
          await attrCollection.setItem(entityKeyName('attribute_code', attr.attribute_code.toLowerCase()), attr)
          await attrCollection.setItem(entityKeyName('attribute_id', attr.attribute_id.toString()), attr)
        } catch (e) {
          Logger.error(e, 'mutations')()
        }
      }
    }
    Vue.set(state, 'list_by_code', attrHashByCode)
    Vue.set(state, 'list_by_id', attrHashById)
    EventBus.$emit('product-after-attributes-loaded')
  }
}

export default mutations
