import * as types from '../../mutation-types'
import { quickSearchByQuery } from '../../lib/search'
import config from '../../lib/config'
import AttributeState from './types/AttributeState'
import RootState from '../../types/RootState'
import { ActionTree } from 'vuex'
const bodybuilder = require('bodybuilder')

const actions: ActionTree<AttributeState, RootState> = {
  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0, includeFields = config.entities.optimize ? config.entities.attribute.includeFields : null }) {
    const commit = context.commit

    let qrObj = bodybuilder()
    for (let value of filterValues) {
      qrObj = qrObj.orFilter('term', filterField, value)
    }

    return quickSearchByQuery({ entityType: 'attribute', query: qrObj.build(), includeFields: includeFields }).then((resp) => {
      commit(types.ATTRIBUTE_UPD_ATTRIBUTES, resp)
    }).catch((err) => {
      console.error(err)
    })
  }
}

export default actions
