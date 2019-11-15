import { ActionTree } from 'vuex'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import RootState from '@vue-storefront/core/types/RootState'
import UserState from '../types/UserState'
import { UserProfile } from '@vue-storefront/core/modules/user/types/UserProfile'
import { UserService } from '@vue-storefront/core/data-resolver'
import * as types from './mutation-types'
import * as userTypes from '@vue-storefront/core/modules/user/store/mutation-types'
import { userHooksExecutors, userHooks } from '@vue-storefront/core/modules/user/hooks'
import { Logger } from '@vue-storefront/core/lib/logger'
import Task from '@vue-storefront/core/lib/sync/types/Task'

import config from 'config'
import Axios from 'axios'
import isEmpty from 'lodash-es/isEmpty'
import { processLocalizedURLAddress } from '@vue-storefront/core/helpers'

const actions: ActionTree<UserState, RootState> = {
  async update ({ dispatch }, profile: UserProfile): Promise<Task> {
    return UserService.updateProfile(profile)
      .then(resp => {
        if (resp.resultCode === 200) {
          dispatch('user/setCurrentUser', resp.result, { root: true })
        } else {
          Logger.error('Error while updating user:', 'user', resp)()
          throw new Error('Error while saving customer data')
        }
        return resp
      })
  },
  async changePassword ({ dispatch, getters }, passwordData): Promise<Task> {
    return UserService.changePassword(passwordData)
      .then(async resp => {
        if (resp.code === 200) {
          await dispatch('login', {
            username: getters.getUserEmail,
            password: passwordData.newPassword
          })
        }
        return resp
      })
  },
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
