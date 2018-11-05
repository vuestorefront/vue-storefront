import Vue from 'vue'
import { ActionTree } from "vuex"
import { quickSearchByQuery } from "core/store/lib/search"
import * as types from '../../mutation-types'
// import rootStore from '../../'
import SearchQuery from "core/store/lib/search/searchQuery"
import RootState from "../../types/RootState"
import { entityKeyName } from '../../lib/entities'
import CmsPageState from "./types/CmsPageState"

const actions: ActionTree<CmsPageState, RootState> = {

  /**
   * Retrieve cms pages
   *
   * @param context
   * @param {any} filterValues
   * @param {any} filterField
   * @param {any} size
   * @param {any} start
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  list (context, { filterValues = null, filterField = 'identifier', size = 150, start = 0, excludeFields = null, includeFields = null, skipCache = false }) {
    let query = new SearchQuery()
    const commit = context.commit

    if (filterValues) {
      query = query.applyFilter({key: filterField, value: {'like': filterValues}})
    }

    if (skipCache || (!context.state.cmsPages || context.state.cmsPages.length === 0)) {
      return quickSearchByQuery({ query, entityType: 'cms_page', excludeFields, includeFields })
      .then((resp) => {
        commit(types.CMSPAGE_UPDATE_CMSPAGES, resp)
        Vue.prototype.$bus.$emit('cmspage-after-list', { query, size: size, start: start, list: resp })
        return resp
      })
      .catch(err => {
        console.error(err)
      })
    } else {
      return new Promise((resolve, reject) => {
        let resp = { items: context.state.cmsPages, total: context.state.cmsPages.length }
        Vue.prototype.$bus.$emit('cmspage-after-list', { query, size: size, start: start, list: resp })
        resolve(resp)
      })
    }
  },

  /**
   * Retrieve single cms page by key value
   *
   * @param context
   * @param {any} key
   * @param {any} value
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  single (context, { key = 'identifier', value, excludeFields = null, includeFields = null }) {

    // const commit = context.commit
    console.log('------------------enter cms page load-------------')
    let query = new SearchQuery()
    if (value) {
      query = query.applyFilter({key: key, value: {'like': value}})
      return quickSearchByQuery({ query, entityType: 'cms_page', excludeFields, includeFields })
      .then((resp) => {
        return resp
      }).catch(err => {
        console.error(err)
      })
    } else {
      throw new Error('No Key/Value was provided to retrieve single CMS page' )
    }

  }
}

export default actions
