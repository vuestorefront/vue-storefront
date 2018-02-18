import * as types from '../mutation-types'
import * as entities from 'lib/entities'
import { execute as taskExecute } from 'src/api/task'
import config from 'config'
import EventBus from 'src/plugins/event-bus'
import * as localForage from 'localforage'

function _prepareTask (task) {
  const taskId = entities.uniqueEntityId(task) // timestamp as a order id is not the best we can do but it's enough
  task.task_id = taskId.toString()
  task.transmited = false
  task.created_at = new Date()
  task.updated_at = new Date()
  return task
}

// initial state
const state = {
}

const getters = {
}

// actions
const actions = {

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

// mutations
const mutations = {
  /**
   * Add task to sync. queue
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.SYNC_ADD_TASK] (state, task) {
    const tasksCollection = global.db.syncTaskCollection
    task = _prepareTask(task)
    tasksCollection.setItem(task.task_id.toString(), task).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    }).then((resp) => {
      EventBus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue
      console.info('Synchronization task added url = ' + task.url + ' taskId = ' + task.task_id)
    }) // populate cache
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
