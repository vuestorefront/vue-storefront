import { ActionTree } from "vuex"
import { quickSearchByQuery } from "core/store/lib/search"
import { currentStoreView, prepareStoreView } from "../../lib/multistore"
import SearchQuery from "core/store/lib/search/searchQuery"
import RootState from "../../types/RootState"
import CmsBlockState from "./types/CmsBlockState"

const actions: ActionTree<CmsBlockState, RootState> = {
  /**
   * Retrieve cms block
   *
   * @param context
   * @param {any} query
   * @param {any} entityType
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  list (context, { identifier, entityType = 'cms_block', excludeFields = null, includeFields = null}) {
    let query = new SearchQuery()
    let storeId = currentStoreView()
    if (identifier) {
      query = query.applyFilter({key: 'identifier', value: {'like': identifier}})
    }

    return quickSearchByQuery({ query, entityType, excludeFields, includeFields }).catch(err => {
      console.error(err)
    })
  }
}

export default actions
