import * as types from '../../mutation-types'
import { execute as taskExecute } from 'core/lib/task'
import { _prepareTask } from './helpers'
import * as localForage from 'localforage'

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
      if (global.isSSR) {
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
