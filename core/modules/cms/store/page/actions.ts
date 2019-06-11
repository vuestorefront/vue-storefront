import { ActionTree } from 'vuex'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import * as types from './mutation-types'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import RootState from '@vue-storefront/core/types/RootState';
import CmsPageState from '../../types/CmsPageState'
import { cacheStorage } from '../../'
import { cmsPagesStorageKey } from './'
import { Logger } from '@vue-storefront/core/lib/logger'

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
  async list ({ commit }, { filterValues = null, filterField = 'identifier', size = 150, start = 0, excludeFields = null, includeFields = null, skipCache = false }) {
    let query = new SearchQuery()
    if (filterValues) {
      query = query.applyFilter({key: filterField, value: {'like': filterValues}})
    }
    return quickSearchByQuery({ query, entityType: 'cms_page', excludeFields, includeFields })
      .then((resp) => {
        commit(types.CMS_PAGE_UPDATE_CMS_PAGES, resp.items)
        return resp.items
      })
      .catch(err => {
        Logger.error(err, 'cms')()
      })
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
  single (context, { key = 'identifier', value, excludeFields = null, includeFields = null, skipCache = false, setCurrent = true }) {
    let query = new SearchQuery()
    if (value) {
      query = query.applyFilter({key: key, value: { 'like': value }})
    }
    if (skipCache || (!context.state.items || context.state.items.length === 0) || !context.state.items.find(p => p[key] === value)) {
      return quickSearchByQuery({ query, entityType: 'cms_page', excludeFields, includeFields })
        .then((resp) => {
          if (resp && resp.items && resp.items.length > 0) {
            context.commit(types.CMS_PAGE_ADD_CMS_PAGE, resp.items[0])
            if (setCurrent) context.commit(types.CMS_PAGE_SET_CURRENT, resp.items[0])
            return resp.items[0]
          } else {
            throw new Error('CMS query returned empty result')
          }
        })
        .catch(err => {
          throw err
        })
    } else {
      return new Promise((resolve, reject) => {
        let resp = context.state.items.find(p => p[key] === value)
        if (resp) {
          if (setCurrent) context.commit(types.CMS_PAGE_SET_CURRENT, resp)
          resolve(resp)
        } else {
          cacheStorage.getItem(cmsPagesStorageKey, (err, storedItems) => {
            if (err) reject(err)
            if (storedItems) {
              context.commit(types.CMS_PAGE_UPDATE_CMS_PAGES, storedItems)
              let resp = storedItems.find(p => p[key] === value)
              if (!resp) reject(new Error('CMS query returned empty result'))
              if (setCurrent) context.commit(types.CMS_PAGE_SET_CURRENT, resp)
              resolve(resp)
            } else {
              reject(new Error('CMS query returned empty result'))
            }
          })
        }
      })
    }
  },

  addItem ({ commit }, page) {
    commit(types.CMS_PAGE_ADD_CMS_PAGE, page)
  }

}

export default actions
