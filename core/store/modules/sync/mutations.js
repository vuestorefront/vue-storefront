import * as types from '../../mutation-types'
import { _prepareTask } from './helpers'
import EventBus from '../../lib/event-bus'
import config from 'config'

export default {
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
