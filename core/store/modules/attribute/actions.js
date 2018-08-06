import * as types from '../../mutation-types'
import SearchQuery from 'core/store/lib/search/searchQuery'
import config from '../../lib/config'
import { quickSearchByQueryObj } from '../../lib/search/search'

export default {
  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0, includeFields = config.entities.optimize ? config.entities.attribute.includeFields : null }) {
    const commit = context.commit

    let searchQuery = new SearchQuery()

    searchQuery = searchQuery.applyFilter({key: filterField, value: {'in': filterValues}})

    return quickSearchByQueryObj({ entityType: 'attribute', searchQuery: searchQuery, includeFields: includeFields }).then(function (resp) {
      commit(types.ATTRIBUTE_UPD_ATTRIBUTES, resp)
    }).catch(function (err) {
      console.error(err)
    })
  }
}
