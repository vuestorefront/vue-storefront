import { ActionTree } from 'vuex'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import RootState from '@vue-storefront/core/types/RootState'
import UserState from '../types/UserState'
import * as types from './mutation-types'
import isEmpty from 'lodash-es/isEmpty'

const actions: ActionTree<UserState, RootState> = {
  setCluster ({ commit }, cluster) {
    if (!isEmpty(cluster)) {
      commit(types.USER_ADD_SESSION_DATA, { key: 'cluster', value: cluster })
    }
  },
  async loadSessionData ({ commit }) {
    const usersCollection = StorageManager.get('user')
    const userData = await usersCollection.getItem('session-data')
    if (userData) {
      commit(types.USER_SET_SESSION_DATA, userData)
    }
  }
}

export default actions
