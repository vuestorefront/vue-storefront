import * as types from '../../mutation-types'
import { entityKeyName } from '../../lib/entities'

export default {
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

      const attrCollection = global.db.attributesCollection
      try {
        attrCollection.setItem(entityKeyName('attribute_code', attr.attribute_code.toLowerCase()), attr).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache by slug
        attrCollection.setItem(entityKeyName('attribute_id', attr.attribute_id.toString()), attr).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache by id
      } catch (e) {
        console.error(e)
      }
    }
    state.list_by_code = attrHashByCode
    state.list_by_id = attrHashById
  }
}
