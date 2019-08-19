import { ExampleState } from '../types/ExampleState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
// you can use this storage if you want to enable offline capabilities
import { cacheStorage } from '../'

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<ExampleState, any> = {
  // if you want to use cache in your module you can load cached data like this
  async loadUsers ({ commit }) {
    const userData = cacheStorage.getItem('user')
    commit(types.SET_USERS, userData)
    return userData
  },
  // if you are using cache in your module it's a good practice to allow develoeprs to choose either to use it or not
  async addUser ({ commit }, { user, useCache = false }) {
    commit(types.ADD_USER, user)
    if (useCache) cacheStorage.setItem('user', user)
    return user
  }
}
