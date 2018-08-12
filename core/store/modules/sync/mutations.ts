import { MutationTree } from 'vuex'
import * as types from '../../mutation-types'
import { _prepareTask } from './helpers'
import EventBus from '../../lib/event-bus'
import config from '../../lib/config'
import SyncState from './types/SyncState'

declare var global: any

const mutations: MutationTree<SyncState> = {
  /**
   * Add task to sync. queue
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.SYNC_ADD_TASK] (state, task) {
    const tasksCollection = global.$VS.db.syncTaskCollection
    task = _prepareTask(task)
    tasksCollection.setItem(task.task_id.toString(), task, (err, resp) => {
      if (err) console.error(err)
      EventBus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue
      console.log('Synchronization task added url = ' + task.url + ' taskId = ' + task.task_id)
    }).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}

export default mutations
