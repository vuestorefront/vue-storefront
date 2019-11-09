import { ActionTree } from 'vuex'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import RootState from '@vue-storefront/core/types/RootState'
import UserState from '../types/UserState'
import * as types from './mutation-types'
import * as userTypes from '@vue-storefront/core/modules/user/store/mutation-types'
import { userHooksExecutors, userHooks } from '@vue-storefront/core/modules/user/hooks'

import config from 'config'
import Axios from 'axios'
import isEmpty from 'lodash-es/isEmpty'
import { processLocalizedURLAddress } from '@vue-storefront/core/helpers'

const actions: ActionTree<UserState, RootState> = {
  setCluster ({ commit }, cluster) {
    if (!isEmpty(cluster) || cluster === false) {
      commit(types.USER_ADD_SESSION_DATA, { key: 'cluster', value: cluster })
    }
  },
  async loadSessionData ({ commit }) {
    const usersCollection = StorageManager.get('user')
    const userData = await usersCollection.getItem('session-data')
    if (userData) {
      commit(types.USER_SET_SESSION_DATA, userData)
    }
  },
  async facebookLogin ({ commit, dispatch }, params: { accessToken: string, version: string}) {
    const { endpoint } = config.icmaa_facebook
    const { accessToken, version } = params
    const apiUrl = processLocalizedURLAddress(endpoint + '/login')

    const resp = await Axios
      .post(apiUrl, { 'access_token': accessToken, version })
      .then(resp => resp)
      .catch(e => { throw new Error(e.response.data.result) })

    userHooksExecutors.afterUserAuthorize(resp.data)

    if (resp.status === 200) {
      try {
        await dispatch('resetUserInvalidateLock', {}, { root: true })
        commit(userTypes.USER_TOKEN_CHANGED, { newToken: resp.data.result }) // TODO: handle the "Refresh-token" header
        await dispatch('sessionAfterAuthorized', { refresh: true, useCache: false })
      } catch (err) {
        await dispatch('clearCurrentUser')
        throw new Error(err)
      }
    }
  }
}

export default actions
