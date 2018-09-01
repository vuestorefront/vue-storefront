import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from '../../mutation-types'
import { _prepareTask } from './helpers'
import SyncState from './types/SyncState'
import rootStore from '../../'

const mutations: MutationTree<SyncState> = {
  /**
   * Add task to sync. queue
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.SYNC_ADD_TASK] (state, task) {
    const tasksCollection = Vue.prototype.$db.syncTaskCollection
    task = _prepareTask(task)
    tasksCollection.setItem(task.task_id.toString(), task, (err, resp) => {
      if (err) console.error(err)
      Vue.prototype.$bus.$emit('sync/PROCESS_QUEUE', { config: rootStore.state.config }) // process checkout queue
      console.log('Synchronization task added url = ' + task.url + ' taskId = ' + task.task_id)
    }).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}

export default mutations
