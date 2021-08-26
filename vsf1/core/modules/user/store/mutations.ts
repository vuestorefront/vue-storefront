import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import UserState from '../types/UserState'
import { Logger } from '@vue-storefront/core/lib/logger'

const mutations: MutationTree<UserState> = {
  [types.USER_TOKEN_CHANGED] (state, payload) {
    state.token = payload.newToken
    if (payload.meta && payload.meta.refreshToken) {
      state.refreshToken = payload.meta.refreshToken // store the refresh token
      Logger.log('Refresh token is set to' + state.refreshToken, 'user')()
    }
  },
  [types.USER_START_SESSION] (state) {
    state.session_started = new Date()
  },
  [types.USER_GROUP_TOKEN_CHANGED] (state, token) {
    state.groupToken = token
  },
  [types.USER_GROUP_CHANGED] (state, groupId) {
    state.groupId = groupId
  },
  [types.USER_INFO_LOADED] (state, currentUser) {
    state.current = currentUser
  },
  [types.USER_ORDERS_HISTORY_LOADED] (state, ordersHistory) {
    state.orders_history = ordersHistory
  },
  [types.USER_END_SESSION] (state) {
    state.token = ''
    state.current = null
    state.session_started = null
  },
  [types.USER_LOCAL_DATA_LOADED] (state, readed = false) {
    state.local_data_loaded = readed
  }
}

export default mutations
