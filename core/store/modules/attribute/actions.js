import * as types from '../../mutation-types'
import bodybuilder from 'bodybuilder'
import { quickSearchByQuery } from 'core/lib/search'

export default {
  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0 }) {
    const commit = context.commit

    let qrObj = bodybuilder()
    for (let value of filterValues) {
      qrObj = qrObj.orFilter('term', filterField, value)
    }

    return quickSearchByQuery({ entityType: 'attribute', query: qrObj.build() }).then(function (resp) {
      commit(types.ATTRIBUTE_UPD_ATTRIBUTES, resp)
    }).catch(function (err) {
      console.error(err)
    })
  }
}
