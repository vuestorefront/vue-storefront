import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/store/types/RootState'
import CmsBlockState from '../../types/CmsBlockState'
import fetch from 'isomorphic-fetch'
import config from  'config'
import { getPrismicParams } from './../../helpers'

const actions: ActionTree<CmsBlockState, RootState> = {
  /**
   * Retrieve cms blocks
   *
   * @param context
   * @param {string} type
   * @param {string} tag
   * @param {string} contentId
   * @param {string} filter
   * @param {string} filterOption
   * @param skipCache
   * @returns {Promise<T> & Promise<any>}
   */
  load (context, {type, tag, contentId, filter, filterOption}) {
    if (!config.prismic) {
      throw new Error(`[CmsPrismic Module] Module configuration was not found.`)
    }
    const prismicParams = getPrismicParams(type, tag, contentId, filter, filterOption)
    const parameter = prismicParams.parameter
    if (!context.getters.contentMap[parameter]) { // fetch if document is not set in store
      return fetch(prismicParams.url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors'
      })
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          if (!json.result) {
            return false
          }
          context.commit(types.CMS_PRISMIC_ADD_CONTENT, { data: json.result.results, index: parameter })
          return json.result
        })
        .catch((err) => {
          throw new Error(`[CmsPrismic Module] Module error: ${err}`)
        })
    }
  }
}

export default actions
