import { ActionTree } from "vuex"
import { quickSearchByQuery } from "core/store/lib/search"
import SearchQuery from "core/store/lib/search/searchQuery"
import RootState from "../../types/RootState"
import CmsPageState from "./types/CmsPageState"

const actions: ActionTree<CmsPageState, RootState> = {
  /**
   * Retrieve cms page
   *
   * @param context
   * @param {any} query
   * @param {any} entityType
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  list (context, { identifier, entityType = 'cms_page', excludeFields = null, includeFields = null}) {
    let query = new SearchQuery()

    if (identifier) {
      query = query.applyFilter({key: 'identifier', value: {'like': identifier}})
    }

    return quickSearchByQuery({ query, entityType, excludeFields, includeFields }).catch(err => {
      console.error(err)
    })
  }
}

export default actions
