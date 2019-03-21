import Vue from 'vue'
import { MutationTree } from 'vuex'
import { entityKeyName } from '@vue-storefront/core/store/lib/entities'
import * as types from './mutation-types'
import AttributeState from '../../types/AttributeState'
import { Logger } from '@vue-storefront/core/lib/logger'

const mutations: MutationTree<AttributeState> = {
  /**
   * Store attributes by code in state and localForage
   * @param {} state
   * @param {Array} attributes
   */
  [types.ATTRIBUTE_UPD_ATTRIBUTES] (state, attributes) {
    let attrList = attributes.items // extract fields from ES _source
    let attrHashByCode = state.list_by_code
    let attrHashById = state.list_by_id

    for (let attr of attrList) {
      attrHashByCode[attr.attribute_code] = attr
      attrHashById[attr.attribute_id] = attr

      const attrCollection = Vue.prototype.$db.attributesCollection
      try {
        attrCollection.setItem(entityKeyName('attribute_code', attr.attribute_code.toLowerCase()), attr).catch((reason) => {
          Logger.error(reason, 'mutations') // it doesn't work on SSR
        }) // populate cache by slug
        attrCollection.setItem(entityKeyName('attribute_id', attr.attribute_id.toString()), attr).catch((reason) => {
          Logger.error(reason, 'mutations') // it doesn't work on SSR
        }) // populate cache by id
      } catch (e) {
        Logger.error(e, 'mutations')()
      }
    }
    Vue.set(state, 'list_by_code', attrHashByCode)
    Vue.set(state, 'list_by_id', attrHashById)
    Vue.prototype.$bus.$emit('product-after-attributes-loaded')
  }
}

export default mutations
