import * as types from '../../mutation-types'
import { execute as taskExecute } from '../../lib/task'
import { _prepareTask } from './helpers'
import * as localForage from 'localforage'
import store from '../../'

export default {
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
    const syncTaskCollection = localForage.createInstance({
      name: 'shop',
      storeName: 'syncTasks'
    })
    syncTaskCollection.iterate((task, id, iterationNumber) => {
      if (!task.transmited) {
        syncTaskCollection.removeItem(id)
      }
    })
  },
  execute ({ commit }, task) { // not offline task
    task = _prepareTask(task)
    const usersCollection = localForage.createInstance({
      name: 'shop',
      storeName: 'user'
    })
    const cartsCollection = localForage.createInstance({
      name: 'shop',
      storeName: 'carts'
    })
    return new Promise((resolve, reject) => {
      if (global.$VS.isSSR) {
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
            if (!currentCartId && store.state.cart.cartServerToken) { // this is workaround; sometimes after page is loaded indexedb returns null despite the cart token is properly set
              currentCartId = store.state.cart.cartServerToken
            }
            if (!currentToken && store.state.user.cartServerToken) { // this is workaround; sometimes after page is loaded indexedb returns null despite the cart token is properly set
              currentToken = store.state.user.token
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
