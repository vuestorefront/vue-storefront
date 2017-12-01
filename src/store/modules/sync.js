import * as types from '../mutation-types'
import * as entities from 'lib/entities'
import * as sw from 'lib/sw'
import config from '../../config.json'

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
    const taskId = entities.uniqueEntityId(task) // timestamp as a order id is not the best we can do but it's enough
    task.task_id = taskId.toString()
    task.transmited = false
    task.created_at = new Date()
    task.updated_at = new Date()

    tasksCollection.setItem(taskId.toString(), task).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    }).then((resp) => {
      sw.postMessage({ config: config, command: types.SYNC_PROCESS_QUEUE }) // process checkout queue
      console.info('Synchronization task added taskId = ' + taskId)
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
