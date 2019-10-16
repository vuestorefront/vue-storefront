
import Vue from 'vue'
import rootStore from '@vue-storefront/core/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { execute as taskExecute, _prepareTask } from './task'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'
import Task from '@vue-storefront/core/lib/sync/types/Task'

/** Syncs given task. If user is offline requiest will be sent to the server after restored connection */
async function queue (task) {
  const tasksCollection = Vue.prototype.$db.syncTaskCollection
  task = _prepareTask(task)
  Logger.info('Sync task queued ' + task.url, 'sync', { task })()
  return new Promise((resolve, reject) => {
    tasksCollection.setItem(task.task_id.toString(), task, (err, resp) => {
      if (err) Logger.error(err, 'sync')()
      Vue.prototype.$bus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue
      resolve(task)
    }).catch((reason) => {
      Logger.error(reason, 'sync')() // it doesn't work on SSR
      reject(reason)
    })
  })
}

/** Runs given task. If user is offline request will fail */
async function execute (task): Promise<Task> { // not offline task
  task = _prepareTask(task)
  return new Promise((resolve, reject) => {
    if (isServer) {
      taskExecute(task, null, null).then((result) => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    } else {
      const currentUserToken = rootStore.getters['user/getUserToken']
      const currentCartToken = rootStore.getters['cart/getCartToken']
      taskExecute(task, currentUserToken, currentCartToken).then((result) => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    }
  })
}

/** Clear sync tasks that were not transmitted yet */
function clearNotTransmited () {
  const syncTaskCollection = Vue.prototype.$db.syncTaskCollection
  syncTaskCollection.iterate((task, id, iterationNumber) => {
    if (!task.transmited) {
      syncTaskCollection.removeItem(id)
    }
  })
}

export const TaskQueue = {
  queue,
  execute,
  clearNotTransmited
}
