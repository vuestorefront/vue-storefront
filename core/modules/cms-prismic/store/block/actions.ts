import { ActionTree } from "vuex"
import * as types from './mutation-types'
import RootState from '@vue-storefront/store/types/RootState';
import CmsBlockState from "../../types/CmsBlockState"
import fetch from 'isomorphic-fetch'
import config from  'config'

const actions: ActionTree<CmsBlockState, RootState> = {

  /**
   * Retrieve cms blocks
   *
   * @param context
   * @param {any} type
   * @param {any} orderings
   * @param {any} contentId
   * @param {any} filter
   * @param {any} filterOption
   * @param skipCache
   * @returns {Promise<T> & Promise<any>}
   */
  load (context, {type, orderings, contentId, filter, filterOption}) {
    let url
    if (config.prismic) {
      if (type) {
        url = (config.prismic.byType)
          .replace('{{type}}', type)
      } else if (orderings) {
        url = (config.prismic.byTag)
          .replace('{{tag}}', orderings)
      } else if (contentId && filter) {
        url = (config.prismic.contentIdFilter)
          .replace('{{contentId}}', contentId)
          .replace('{{filter}}', filter)
          .replace('{{filterOption}}', filterOption)
      } else if (contentId && !filter) {
        url = (config.prismic.contentId)
          .replace('{{contentId}}', contentId)
      } else {
        return false
      }
      return fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors'}
      )
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          if (!json.result) {
            return false
          }
          if (contentId && json.result) {
            if (json.result[0]) {
              json.result[0].id = contentId
              context.commit(types.CMS_PRISMIC_ADD_CONTENT_BY_ID, json.result[0])
              return json.result
            }
          } else if (type && json.result) {
            if (json.result[0]) {
              json.result[0].id = contentId
              context.commit(types.CMS_PRISMIC_ADD_CONTENT_BY_TYPE, json.result)
              return json.result
            }
          }
        })
        .catch((e) => {
          console.error('CMS fetch error:' + e)
        })
    }
  }
}

export default actions
