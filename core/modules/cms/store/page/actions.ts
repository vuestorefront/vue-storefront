import Vue from 'vue'
import { ActionTree } from "vuex"
import { quickSearchByQuery } from '@vue-storefront/store/lib/search'
import * as types from './mutation-types'
import SearchQuery from '@vue-storefront/store/lib/search/searchQuery'
import RootState from '@vue-storefront/store/types/RootState';
import { entityKeyName } from '@vue-storefront/store/lib/entities'
import CmsPageState from "../../types/CmsPageState"
import store from '@vue-storefront/store'
import { HttpError } from '@vue-storefront/core/lib/exceptions'

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
    if (filterValues) {
      query = query.applyFilter({key: filterField, value: {'like': filterValues}})
    }
    if (skipCache || (!context.state.cmsPages || context.state.cmsPages.length === 0)) {
      return quickSearchByQuery({ query, entityType: 'cms_page', excludeFields, includeFields })
      .then((resp) => {
        context.commit(types.CMS_PAGE_UPDATE_CMS_PAGES, resp.items)
        Vue.prototype.$bus.$emit('cmspage-after-list', { query, size: size, start: start, cmsPages: resp.items })
        return resp.items
      })
      .catch(err => {
        console.error(err)
      })
    } else {
      return new Promise((resolve, reject) => {
        let resp = context.state.cmsPages
        Vue.prototype.$bus.$emit('cmspage-after-list', { query, size: size, start: start, cmsPages: resp })
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
    const state = context.state
    const dispatch = context.dispatch
    return new Promise((resolve, reject) => {
      if (state.cmsPages.length > 0) {
        // SSR - there were some issues with using localForage, so it's the reason to use local state instead, when possible
        let cmsPage = state.cmsPages.find((itm) => { return itm[key] === value })
        if (cmsPage) {
          resolve(cmsPage)
        } else {
          reject(new Error('CMS page query returned empty result ' + key + ' = ' + value))
        }
      } else  {
        if (Object.keys(Vue.prototype.$db.cmsPagesCollection._localCache).length > 0) {
          Vue.prototype.$db.cmsPagesCollection.getItem(entityKeyName(key, value), (error, cmsPage) => {
            if (error) {
              console.error(error)
              reject(error)
            }
            if (cmsPage) {
              resolve(cmsPage)
            } else {
              throw new Error('CMS page query returned empty results' + key + ' = ' + value)
            }
          }).catch(err => {
            console.error(err)
            reject(err)
          })
        }
        else {
          dispatch('list', { size: store.state.config.cms_page.max_count, excludeFields, includeFields }).then(cmspages => {
            let cmsPage = cmspages.find((itm) => { return itm[key] === value })
            if(cmsPage) {
              return resolve(cmsPage)
            } else {
              return reject(new HttpError('page not found', 404))
            }
          }).catch(err => {
            console.error(err)
            reject(err)
          })
        }

      }
    })

  }
}

export default actions
