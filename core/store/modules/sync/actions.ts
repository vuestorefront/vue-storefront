import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from '../../mutation-types'
import { execute as taskExecute } from '../../lib/task'
import { _prepareTask } from './helpers'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/store/lib/storage'
import { currentStoreView } from '../../lib/multistore'
import rootStore from '../../'
import RootState from '../../types/RootState'
import SyncState from './types/SyncState'
const config = rootStore.state.config

const actions: ActionTree<SyncState, RootState> = {
  /**
   * Queue synchronization task
   * {
   *  url: url // {{token}} will be replaced for current user token!
   *  payload: {
   *    method: 'POST',
   *    headers: {  "Content-Type": "application/json"  },
   *    mode: 'cors',
   *    body: JSON.stringify({ username: username, password: password })
   *  }
   * }
   */
  queue ({ commit }, task) {
    commit(types.SYNC_ADD_TASK, task)
    return task
  },
  clearNotTransmited ({ commit }) {
    const storeView = currentStoreView()
    const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

    const syncTaskCollection = new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'syncTasks',
      driver: localForage[config.localForage.defaultDrivers['syncTasks']]
    }))
    syncTaskCollection.iterate((task, id, iterationNumber) => {
      if (!task.transmited) {
        syncTaskCollection.removeItem(id)
      }
    })
  },
  execute ({ commit }, task) { // not offline task
    const storeView = currentStoreView()
    const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''
    task = _prepareTask(task)
    const usersCollection = new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'user',
      driver: localForage[config.localForage.defaultDrivers['user']]
    }))
    const cartsCollection = new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'carts',
      driver: localForage[config.localForage.defaultDrivers['carts']]
    }))
    return new Promise((resolve, reject) => {
      if (Vue.prototype.$isServer) {
        taskExecute(task, null, null).then((result) => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      } else {
        usersCollection.getItem('current-token', (err, currentToken) => { // TODO: if current token is null we should postpone the queue and force re-login - only if the task requires LOGIN!
          if (err) {
            console.error(err)
          }
          cartsCollection.getItem('current-cart-token', (err, currentCartId) => {
            if (err) {
              console.error(err)
            }
            if (!currentCartId && rootStore.state.cart.cartServerToken) { // this is workaround; sometimes after page is loaded indexedb returns null despite the cart token is properly set
              currentCartId = rootStore.state.cart.cartServerToken
            }
            if (!currentToken && rootStore.state.user.cartServerToken) { // this is workaround; sometimes after page is loaded indexedb returns null despite the cart token is properly set
              currentToken = rootStore.state.user.token
            }
            taskExecute(task, currentToken, currentCartId).then((result) => {
              resolve(result)
            }).catch(err => {
              reject(err)
            })
          })
        })
      }
    })
  }
}

export default actions
