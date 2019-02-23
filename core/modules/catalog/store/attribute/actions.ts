import * as types from './mutation-types'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import AttributeState from '../../types/AttributeState'
import RootState from '@vue-storefront/core/types/RootState'
import { ActionTree } from 'vuex'
import rootStore from '@vue-storefront/core/store'
import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<AttributeState, RootState> = {
  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  list (context, { filterValues = null, filterField = 'attribute_code', only_user_defined = false, only_visible = false, size = 150, start = 0, includeFields = rootStore.state.config.entities.optimize ? rootStore.state.config.entities.attribute.includeFields : null }) {
    const commit = context.commit

    let searchQuery = new SearchQuery()
    const orgFilterValues = filterValues ? [...filterValues] : []
    if (filterValues) {
      filterValues = filterValues.filter(fv => { // check the already loaded
        if (context.state.blacklist !== null && context.state.blacklist.includes(fv)) return false // return that this attribute is not on our blacklist
        if (filterField === 'attribute_id') return (typeof context.state.list_by_id[fv] === 'undefined' || context.state.list_by_id[fv] === null)
        if (filterField === 'attribute_code') return (typeof context.state.list_by_code[fv] === 'undefined' || context.state.list_by_code[fv] === null)
      })
      if (!filterValues || filterValues.length === 0) {
        Logger.info('Skipping attribute load - attributes already loaded', 'attr', { orgFilterValues, filterField})()
        return Promise.resolve({
          items: Object.values(context.state.list_by_code)
        })
      }
      searchQuery = searchQuery.applyFilter({key: filterField, value: {'in': filterValues}})
    }
    if (only_user_defined) {
      searchQuery = searchQuery.applyFilter({key: 'is_user_defined', value: {'in': [true]}})
    }
    if (only_visible) {
      searchQuery = searchQuery.applyFilter({key: 'is_visible', value: {'in': [true]}})
    }
    return quickSearchByQuery({ entityType: 'attribute', query: searchQuery, includeFields: includeFields }).then((resp) => {
      if (resp && Array.isArray(orgFilterValues) && orgFilterValues.length > 0) {
        const foundValues = resp.items.map(attr => attr[filterField])
        const toBlackList = filterValues.filter(ofv => !foundValues.includes(ofv))
        toBlackList.map(tbl => {
          if (!context.state.blacklist.includes(tbl)) context.state.blacklist.push(tbl)
        }) // extend the black list of not-found atrbiutes
      }
      commit(types.ATTRIBUTE_UPD_ATTRIBUTES, resp)
    })
  }
}

export default actions
