import * as types from './mutation-types'
import SearchQuery from '@vue-storefront/store/lib/search/searchQuery'
import { quickSearchByQuery } from '@vue-storefront/store/lib/search'
import AttributeState from '../../types/AttributeState'
import RootState from '@vue-storefront/store/types/RootState'
import { ActionTree } from 'vuex'
import rootStore from '@vue-storefront/store'

const actions: ActionTree<AttributeState, RootState> = {
  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0, includeFields = rootStore.state.config.entities.optimize ? rootStore.state.config.entities.attribute.includeFields : null }) {
    const commit = context.commit

    let searchQuery = new SearchQuery()

    searchQuery = searchQuery.applyFilter({key: filterField, value: {'in': filterValues}})

    return quickSearchByQuery({ entityType: 'attribute', query: searchQuery, includeFields: includeFields }).then((resp) => {
      commit(types.ATTRIBUTE_UPD_ATTRIBUTES, resp)
    })
  }
}

export default actions
