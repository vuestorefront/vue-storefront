import i18n from '@vue-storefront/i18n'
import isNaN from 'lodash-es/isNaN'
import isUndefined from 'lodash-es/isUndefined'
import fetch from 'isomorphic-fetch'
import rootStore from '@vue-storefront/core/store'
import { adjustMultistoreApiUrl, currentStoreView } from '@vue-storefront/core/lib/multistore'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import { Logger } from '@vue-storefront/core/lib/logger'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import * as entities from '@vue-storefront/core/lib/store/entities'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { serial } from '@vue-storefront/core/helpers'
import config from 'config'
import { onlineHelper } from '@vue-storefront/core/helpers'
import { hasResponseError, getResponseMessage } from '@vue-storefront/core/lib/sync/helpers'
import queryString from 'query-string'

export function _prepareTask (task) {
  const taskId = entities.uniqueEntityId(task) // timestamp as a order id is not the best we can do but it's enough
  task.task_id = taskId.toString()
  task.transmited = false
  task.created_at = new Date()
  task.updated_at = new Date()
  return task
}

function _sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function getUrl (task, currentToken, currentCartId) {
  let url = task.url
    .replace('{{token}}', (currentToken == null) ? '' : currentToken)
    .replace('{{cartId}}', (currentCartId == null) ? '' : currentCartId)

  url = processURLAddress(url); // use relative url paths
  if (config.storeViews.multistore) {
    url = adjustMultistoreApiUrl(url)
  }

  if (config.users.tokenInHeader) {
    const parsedUrl = queryString.parseUrl(url)
    delete parsedUrl['query']['token']
    url = queryString.stringifyUrl(parsedUrl)
  }

  return url
}

function getPayload (task, currentToken) {
  const payload = {
    ...task.payload,
    headers: {
      ...task.payload.headers,
      ...(config.users.tokenInHeader ? { authorization: `Bearer ${currentToken}` } : {})
    }
  }
  return payload
}

function _internalExecute (resolve, reject, task: Task, currentToken, currentCartId) {
  if (currentToken && rootStore.state.userTokenInvalidateLock > 0) { // invalidate lock set
    Logger.log('Waiting for rootStore.state.userTokenInvalidateLock to release for ' + task.url, 'sync')()
    _sleep(1000).then(() => {
      Logger.log('Another try for rootStore.state.userTokenInvalidateLock for ' + task.url, 'sync')()
      _internalExecute(resolve, reject, task, currentToken, currentCartId)
    })
    return // return but not resolve
  } else if (rootStore.state.userTokenInvalidateLock < 0) {
    Logger.error('Aborting the network task' + task.url + rootStore.state.userTokenInvalidateLock, 'sync')()
    resolve({ code: 401, result: i18n.t('Error refreshing user token. User is not authorized to access the resource') })()
    return
  } else {
    if (rootStore.state.userTokenInvalidated) {
      Logger.log('Using new user token' + rootStore.state.userTokenInvalidated, 'sync')()
      currentToken = rootStore.state.userTokenInvalidated
    }
  }
  const isCartIdRequired = task.url.includes('{{cartId}}') // this is bypass for #2592
  if (isCartIdRequired && !currentCartId) { // by some reason we does't have the  cart id yet
    reject('Error executing sync task ' + task.url + ' the required cartId  argument is null. Re-creating shopping cart synchro.')
    return
  }
  const url = getUrl(task, currentToken, currentCartId)
  const payload = getPayload(task, currentToken)
  let silentMode = false
  Logger.info('Executing sync task ' + url, 'sync', task)()
  return fetch(url, payload).then((response) => {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    } else {
      const msg = i18n.t('Error with response - bad content-type!')
      Logger.error(msg.toString(), 'sync')()
      reject(msg)
    }
  }).then((jsonResponse) => {
    if (jsonResponse) {
      const responseCode = parseInt(jsonResponse.code)
      if (responseCode !== 200) {
        if (responseCode === 401 /** unauthorized */ && currentToken) { // the token is no longer valid, try to invalidate it
          Logger.error('Invalid token - need to be revalidated' + currentToken + task.url + rootStore.state.userTokenInvalidateLock, 'sync')()
          silentMode = true
          if (config.users.autoRefreshTokens) {
            if (!rootStore.state.userTokenInvalidateLock) {
              rootStore.state.userTokenInvalidateLock++
              if (rootStore.state.userTokenInvalidateAttemptsCount >= config.queues.maxNetworkTaskAttempts) {
                Logger.error('Internal Application error while refreshing the tokens. Please clear the storage and refresh page.', 'sync')()
                rootStore.state.userTokenInvalidateLock = -1
                rootStore.dispatch('user/logout', { silent: true })
                TaskQueue.clearNotTransmited()
                EventBus.$emit('modal-show', 'modal-signup')
                rootStore.dispatch('notification/spawnNotification', {
                  type: 'error',
                  message: i18n.t('Internal Application error while refreshing the tokens. Please clear the storage and refresh page.'),
                  action1: { label: i18n.t('OK') }
                })
                rootStore.state.userTokenInvalidateAttemptsCount = 0
              } else {
                Logger.info('Invalidation process in progress (autoRefreshTokens is set to true)' + rootStore.state.userTokenInvalidateAttemptsCount + rootStore.state.userTokenInvalidateLock, 'sync')()
                rootStore.state.userTokenInvalidateAttemptsCount++
                rootStore.dispatch('user/refresh').then((token) => {
                  if (token) {
                    rootStore.state.userTokenInvalidateLock = 0
                    rootStore.state.userTokenInvalidated = token
                    Logger.info('User token refreshed successfully' + token, 'sync')()
                  } else {
                    rootStore.state.userTokenInvalidateLock = -1
                    rootStore.dispatch('user/logout', { silent: true })
                    EventBus.$emit('modal-show', 'modal-signup')
                    TaskQueue.clearNotTransmited()
                    Logger.error('Error refreshing user token' + token, 'sync')()
                  }
                }).catch((excp) => {
                  rootStore.state.userTokenInvalidateLock = -1
                  rootStore.dispatch('user/logout', { silent: true })
                  EventBus.$emit('modal-show', 'modal-signup')
                  TaskQueue.clearNotTransmited()
                  Logger.error('Error refreshing user token' + excp, 'sync')()
                })
              }
            }
            if (rootStore.state.userTokenInvalidateAttemptsCount <= config.queues.maxNetworkTaskAttempts) _internalExecute(resolve, reject, task, currentToken, currentCartId) // retry
          } else {
            Logger.info('Invalidation process is disabled (autoRefreshTokens is set to false)', 'sync')()
            rootStore.dispatch('user/logout', { silent: true })
            EventBus.$emit('modal-show', 'modal-signup')
          }
        }

        if (!task.silent && jsonResponse.result && hasResponseError(jsonResponse) && !silentMode) {
          rootStore.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t(getResponseMessage(jsonResponse)),
            action1: { label: i18n.t('OK') }
          })
        }
      }

      Logger.debug('Response for: ' + task.task_id + ' = ' + JSON.stringify(jsonResponse.result), 'sync')()
      task.transmited = true
      task.transmited_at = new Date()
      task.result = jsonResponse.result
      task.resultCode = jsonResponse.code
      task.code = jsonResponse.code // backward compatibility to fetch()
      task.acknowledged = false
      task.meta = jsonResponse.meta

      if (task.callback_event) {
        if (task.callback_event.startsWith('store:')) {
          rootStore.dispatch(task.callback_event.split(':')[1], task)
        } else {
          EventBus.$emit(task.callback_event, task)
        }
      }
      if (!rootStore.state.userTokenInvalidateLock) { // in case we're revalidaing the token - user must wait for it
        resolve(task)
      }
    } else {
      const msg = i18n.t('Unhandled error, wrong response format!')
      Logger.error(msg.toString(), 'sync')()
      reject(msg)
    }
  }).catch((err) => {
    Logger.error(err, 'sync')()
    reject(err)
  })
}

export function execute (task: Task, currentToken = null, currentCartId = null): Promise<Task> {
  const taskId = task.task_id

  return new Promise((resolve, reject) => {
    _internalExecute(resolve, reject, task, currentToken, currentCartId)
  })
}

export function initializeSyncTaskStorage () {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  StorageManager.init('syncTasks')
}

export function registerSyncTaskProcessor () {
  const mutex = {}
  EventBus.$on('sync/PROCESS_QUEUE', async data => {
    if (onlineHelper.isOnline) {
      // event.data.config - configuration, endpoints etc
      const syncTaskCollection = StorageManager.get('syncTasks')
      const currentUserToken = rootStore.getters['user/getUserToken']
      const currentCartToken = rootStore.getters['cart/getCartToken']

      const fetchQueue = []
      Logger.debug('Current User token = ' + currentUserToken)()
      Logger.debug('Current Cart token = ' + currentCartToken)()
      syncTaskCollection.iterate((task, id) => {
        if (task && !task.transmited && !mutex[id]) { // not sent to the server yet
          mutex[id] = true // mark this task as being processed
          fetchQueue.push(execute(task, currentUserToken, currentCartToken).then(executedTask => {
            if (!executedTask.is_result_cacheable) {
              syncTaskCollection.removeItem(id) // remove successfully executed task from the queue
            } else {
              syncTaskCollection.setItem(id, executedTask) // update the 'transmitted' field
            }
            mutex[id] = false
          }).catch(err => {
            mutex[id] = false
            Logger.error(err)()
          }))
        }
      }, (err) => {
        if (err) Logger.error(err)()
        Logger.debug('Iteration has completed')()
        // execute them serially
        serial(fetchQueue)
        Logger.debug('Processing sync tasks queue has finished')()
      })
    }
  })
}
