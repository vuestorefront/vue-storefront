
import Vue from 'vue'
import rootStore from '@vue-storefront/core/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { execute as taskExecute, _prepareTask } from './task'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '../multistore'
import { isServer } from '@vue-storefront/core/helpers'

/** Syncs given task. If user is offline requiest will be sent to the server after restored connection */
function queue (task) {
  const tasksCollection = Vue.prototype.$db.syncTaskCollection
  task = _prepareTask(task)
  Logger.info('Sync task queued ' + task.url, 'sync', { task })()
  return new Promise((resolve, reject) => {
    tasksCollection.setItem(task.task_id.toString(), task, (err, resp) => {
      if (err) Logger.error(err, 'sync')()
      Vue.prototype.$bus.$emit('sync/PROCESS_QUEUE', { config: rootStore.state.config }) // process checkout queue
      resolve(task)
    }).catch((reason) => {
      Logger.error(reason, 'sync')() // it doesn't work on SSR
      reject(reason)
    })
  })
}

/** Runs given task. If user is offline request will fail */
function execute (task) { // not offline task
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''
  task = _prepareTask(task)
  // Logger.info('New sync task [execute] ' + task.url, 'sync', task)()
  const usersCollection = new UniversalStorage(localForage.createInstance({
    name: (rootStore.state.config.storeViews.commonCache ? '' : dbNamePrefix) + 'shop',
    storeName: 'user',
    driver: localForage[rootStore.state.config.localForage.defaultDrivers['user']]
  }))
  const cartsCollection = new UniversalStorage(localForage.createInstance({
    name: (rootStore.state.config.storeViews.commonCache ? '' : dbNamePrefix) + 'shop',
    storeName: 'carts',
    driver: localForage[rootStore.state.config.localForage.defaultDrivers['carts']]
  }))
  return new Promise((resolve, reject) => {
    if (isServer) {
      taskExecute(task, null, null).then((result) => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    } else {
      usersCollection.getItem('current-token', (err, currentToken) => { // TODO: if current token is null we should postpone the queue and force re-login - only if the task requires LOGIN!
        if (err) {
          Logger.error(err, 'sync')()
        }
        cartsCollection.getItem('current-cart-token', (err, currentCartId) => {
          if (err) {
            Logger.error(err, 'sync')()
          }
          if (!currentCartId && rootStore.state.cart.cartServerToken) { // this is workaround; sometimes after page is loaded indexedb returns null despite the cart token is properly set
            currentCartId = rootStore.state.cart.cartServerToken
          }
          const token = currentToken ? currentToken : rootStore.getters['user/getUserToken']

          taskExecute(task, token, currentCartId).then((result) => {
            resolve(result)
          }).catch(err => {
            reject(err)
          })
        })
      })
    }
  })
}

/** Clear sync tasks that were not transmitted yet */
function clearNotTransmited () {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  const syncTaskCollection = new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'syncTasks',
    driver: localForage[rootStore.state.config.localForage.defaultDrivers['syncTasks']]
  }))
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
