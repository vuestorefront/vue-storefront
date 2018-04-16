import * as types from '../../mutation-types'
import bodybuilder from 'bodybuilder'
import { quickSearchByQuery } from '../../lib/search'
import config from '../../lib/config'

export default {
  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0, includeFields = config.ssr.optimize ? [ 'attribute_code', 'id', 'entity_type_id', 'options', 'default_value', 'is_user_defined', 'frontend_label', 'attribute_id' ] : null }) {
    const commit = context.commit

    let qrObj = bodybuilder()
    for (let value of filterValues) {
      qrObj = qrObj.orFilter('term', filterField, value)
    }

    return quickSearchByQuery({ entityType: 'attribute', query: qrObj.build(), includeFields: includeFields }).then(function (resp) {
      commit(types.ATTRIBUTE_UPD_ATTRIBUTES, resp)
    }).catch(function (err) {
      console.error(err)
    })
  }
}
