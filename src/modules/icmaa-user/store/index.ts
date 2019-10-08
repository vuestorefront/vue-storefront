import { Module } from 'vuex'
import { userStore } from '@vue-storefront/core/modules/user/store'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import UserState from '../types/UserState'

import merge from 'lodash-es/merge'

export const ExtendedUserStore: Module<UserState, any> = {
  state: merge(userStore.state, {
    sessionData: {}
  }),
  mutations,
  actions,
  getters
}
