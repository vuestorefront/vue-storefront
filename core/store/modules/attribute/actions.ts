import * as types from '../../mutation-types'
import SearchQuery from 'core/store/lib/search/searchQuery'
import config from '../../lib/config'
import { quickSearchByQuery } from '../../lib/search'
import AttributeState from './types/AttributeState'
import RootState from '../../types/RootState'
import { ActionTree } from 'vuex'

const actions: ActionTree<AttributeState, RootState> = {
  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0, includeFields = config.entities.optimize ? config.entities.attribute.includeFields : null }) {
    const commit = context.commit

    let searchQuery = new SearchQuery()

    searchQuery = searchQuery.applyFilter({key: filterField, value: {'in': filterValues}})

    return quickSearchByQuery({ entityType: 'attribute', query: searchQuery, includeFields: includeFields }).then((resp) => {
      commit(types.ATTRIBUTE_UPD_ATTRIBUTES, resp)
    }).catch((err) => {
      console.error(err)
    })
  }
}

export default actions
