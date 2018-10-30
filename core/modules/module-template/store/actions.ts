import { ExampleState } from '../types/ExampleState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
// you can use this storage if you want to enable offline capabilities
import { cacheStorage } from '../'

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<ExampleState, any> = {
  // if you want to use cache in your module you can load cached data like this
  loadUsers ({ commit }) {
    return new Promise ((resolve, reject) => {
      cacheStorage.getItem('user').then(userData => {
        commit(types.SET_USERS, userData)
        resolve(userData)
      }).catch(() => reject())
    })
  },
  // if you are using cache in your module it's a good practice to allow develoeprs to choose either to use it or not
  addUser ({ commit }, { user, useCache = false }) {
    return new Promise ((resolve, reject) => {
      commit(types.ADD_USER, user)
      if (useCache) cacheStorage.setItem('user', user)
      resolve(user)
    })
  }
}