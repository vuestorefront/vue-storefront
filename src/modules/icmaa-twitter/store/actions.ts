import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import TwitterState from '../types/TwitterState'
import * as mutationTypes from './mutation-types'
import { cacheStorage as cache } from '../'

import Axios from 'axios'
import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers'

import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<TwitterState, RootState> = {
  async fetchStatusFeed (context, screenName: string) {
    const { endpoint } = config.icmaa_twitter
    const apiUrl = endpoint + '/feed/' + encodeURIComponent(screenName) + '/3'
    return Axios.get(processURLAddress(apiUrl))
      .then(resp => resp.data.result && resp.data.result.items ? resp.data.result.items : [])
      .catch(() => [])
  },
  async loadStatusFeed ({ dispatch, state, commit }, screenName: string): Promise<any> {
    const cacheKey = 'status/' + screenName
    if (!state.status || Object.keys(state.status).length === 0 || !state.status.find(s => s.screenName === screenName)) {
      if (await cache.getItem(cacheKey).then(item => item !== null)) {
        return cache.getItem(cacheKey).then(status => {
          commit(mutationTypes.SN_ICMAA_TWITTER_ADD_STATUS, { screenName, status })
          return status
        })
      }

      const status = await dispatch('fetchStatusFeed', screenName)

      commit(mutationTypes.SN_ICMAA_TWITTER_ADD_STATUS, { screenName, status })
      return cache.setItem(cacheKey, status)
        .catch(error => Logger.error(error, 'icmaa-twitter'))
    } else {
      return new Promise((resolve, reject) => {
        let result = state.status.find(s => s.screenName === screenName)
        if (result) {
          cache.setItem(cacheKey, result.status)
            .catch(error => Logger.error(error, 'icmaa-twitter'))
          resolve(result)
        } else {
          reject('Error while fetching state for ' + name)
        }
      })
    }
  }
}

export default actions
