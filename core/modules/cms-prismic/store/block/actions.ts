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
   * @param {string} orderings
   * @param {string} contentId
   * @param {string} filter
   * @param {string} filterOption
   * @param skipCache
   * @returns {Promise<T> & Promise<any>}
   */
  load (context, {type, orderings, contentId, filter, filterOption}) {
    if (!config.prismic) {
      throw new Error(`[CmsPrismic Module] Module configuration was not found.`)
    }
    const prismicParams = getPrismicParams(type, orderings, contentId, filter, filterOption)
    const getter = prismicParams.getterName
    const parameter = prismicParams.parameter
    if (!context.getters[getter][parameter]) { // fetch if document is not set in store
      console.log('!!!2', prismicParams.url)
      return fetch(prismicParams.url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors'
      })
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          console.log('!!!lel1', json)
          if (!json.result) {
            return false
          }
          console.log('!!!lel')
          context.commit(types.CMS_PRISMIC_ADD_CONTENT, json.result.results)
          return json.result
        })
        .catch((err) => {
          throw new Error(`[CmsPrismic Module] Module error: ${err}`)
        })
    }
  }
}

export default actions
