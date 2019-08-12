import { ActionTree } from 'vuex'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import * as types from './mutation-types'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import RootState from '@vue-storefront/core/types/RootState';
import CmsBlockState from '../../types/CmsBlockState'
import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<CmsBlockState, RootState> = {

  /**
   * Retrieve cms blocks
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
    if (filterValues) {
      query = query.applyFilter({key: filterField, value: {'like': filterValues}})
    }
    if (skipCache || (!context.state.items || context.state.items.length === 0)) {
      return quickSearchByQuery({ query, entityType: 'cms_block', excludeFields, includeFields })
        .then((resp) => {
          context.commit(types.CMS_BLOCK_UPDATE_CMS_BLOCKS, resp.items)
          return resp.items
        })
        .catch(err => {
          Logger.error(err, 'cms')()
        })
    } else {
      return new Promise((resolve, reject) => {
        let resp = context.state.items
        resolve(resp)
      })
    }
  },

  /**
   * Retrieve single cms block by key value
   *
   * @param context
   * @param {any} key
   * @param {any} value
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  single (context, { key = 'identifier', value, excludeFields = null, includeFields = null, skipCache = false }) {
    const state = context.state
    let cmsBlock = []
    if (state.items && state.items.length > 0) {
      cmsBlock = state.items.filter(item => item[key] === value)
    }
    if (skipCache || cmsBlock.length === 0) {
      let query = new SearchQuery()
      if (value) {
        query = query.applyFilter({key: key, value: {'like': value}})
      }
      return quickSearchByQuery({ query, entityType: 'cms_block', excludeFields, includeFields })
        .then((resp) => {
          if (resp.items.length > 0) {
            context.commit(types.CMS_BLOCK_ADD_CMS_BLOCK, resp.items[0])
            return resp.items[0]
          }
        })
        .catch(err => {
          Logger.error(err, 'cms')()
        })
    } else {
      return new Promise((resolve, reject) => {
        resolve(cmsBlock[0])
      })
    }
  },

  addItem ({ commit }, block) {
    commit(types.CMS_BLOCK_ADD_CMS_BLOCK, block)
  }
}

export default actions
