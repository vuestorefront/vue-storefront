import { ActionTree } from "vuex"
import { quickSearchByQuery } from '@vue-storefront/store/lib/search'
import SearchQuery from '@vue-storefront/store/lib/search/searchQuery'
import RootState from '@vue-storefront/store/types/RootState';
import CmsHierarchyState from "../../types/CmsHierarchyState"

const actions: ActionTree<CmsHierarchyState, RootState> = {
  /**
   * Retrieve cms hierarchy
   *
   * @param context
   * @param {any} query
   * @param {any} entityType
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  list (context, { id, entityType = 'cms_hierarchy', excludeFields = null, includeFields = null}) {
    let query = new SearchQuery()

    if (id) {
      query = query.applyFilter({key: 'identifier', value: {'eq': id}})
    }

    return quickSearchByQuery({ query, entityType, excludeFields, includeFields }).catch(err => {
      console.error(err)
    })
  }
}

export default actions
