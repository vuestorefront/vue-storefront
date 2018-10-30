import Vue from 'vue'
import i18n from '@vue-storefront/i18n'
import isNaN from 'lodash-es/isNaN'
import isUndefined from 'lodash-es/isUndefined'
import toString from 'lodash-es/toString'
import fetch from 'isomorphic-fetch'
import rootStore from '../'
import { adjustMultistoreApiUrl } from '@vue-storefront/store/lib/multistore'
import Task from '../types/task/Task'

const AUTO_REFRESH_MAX_ATTEMPTS = 20

function _sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function _internalExecute (resolve, reject, task: Task, currentToken, currentCartId) {
  if (currentToken !== null && rootStore.state.userTokenInvalidateLock > 0) { // invalidate lock set
    console.log('Waiting for rootStore.state.userTokenInvalidateLock to release for', task.url)
    _sleep(1000).then(() => {
      console.log('Another try for rootStore.state.userTokenInvalidateLock for ', task.url)
      _internalExecute(resolve, reject, task, currentToken, currentCartId)
    })
    return // return but not resolve
  } else if (rootStore.state.userTokenInvalidateLock < 0) {
    console.error('Aborting the network task', task.url, rootStore.state.userTokenInvalidateLock)
    resolve({ code: 401, message: i18n.t('Error refreshing user token. User is not authorized to access the resource') })
    return
  } else {
    if (rootStore.state.userTokenInvalidated) {
      console.log('Using new user token', rootStore.state.userTokenInvalidated)
      currentToken = rootStore.state.userTokenInvalidated
    }
  }
  let url = task.url.replace('{{token}}', (currentToken == null) ? '' : currentToken).replace('{{cartId}}', (currentCartId == null) ? '' : currentCartId)
  if (rootStore.state.config.storeViews.multistore) {
    url = adjustMultistoreApiUrl(url)
  }
  let silentMode = false
  return fetch(url, task.payload).then((response) => {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    } else {
      const msg = i18n.t('Error with response - bad content-type!')
      console.error(msg)
      reject(msg)
    }
  }).then((jsonResponse) => {
    if (jsonResponse) {
      if (parseInt(jsonResponse.code) !== 200) {
        let resultString = jsonResponse.result ? toString(jsonResponse.result) : null
        if (resultString && (resultString.indexOf(i18n.t('not authorized')) >= 0 || resultString.indexOf('not authorized')) >= 0 && currentToken !== null) { // the token is no longer valid, try to invalidate it
          console.error('Invalid token - need to be revalidated', currentToken, task.url, rootStore.state.userTokenInvalidateLock)
          if (isNaN(rootStore.state.userTokenInvalidateAttemptsCount) || isUndefined(rootStore.state.userTokenInvalidateAttemptsCount)) rootStore.state.userTokenInvalidateAttemptsCount = 0
          if (isNaN(rootStore.state.userTokenInvalidateLock) || isUndefined(rootStore.state.userTokenInvalidateLock)) rootStore.state.userTokenInvalidateLock = 0

          silentMode = true
          if (rootStore.state.config.users.autoRefreshTokens) {
            if (!rootStore.state.userTokenInvalidateLock) {
              rootStore.state.userTokenInvalidateLock++
              if (rootStore.state.userTokenInvalidateAttemptsCount >= AUTO_REFRESH_MAX_ATTEMPTS) {
                console.error('Internal Application error while refreshing the tokens. Please clear the storage and refresh page.')
                rootStore.state.userTokenInvalidateLock = -1
                rootStore.dispatch('user/logout', { silent: true })
                rootStore.dispatch('sync/clearNotTransmited')
                Vue.prototype.$bus.$emit('modal-show', 'modal-signup')
                rootStore.dispatch('notification/spawnNotification', {
                  type: 'error',
                  message: i18n.t('Internal Application error while refreshing the tokens. Please clear the storage and refresh page.'),
                  action1: { label: i18n.t('OK') }
                })
                rootStore.state.userTokenInvalidateAttemptsCount = 0
              } else {
                console.info('Invalidation process in progress (autoRefreshTokens is set to true)', rootStore.state.userTokenInvalidateAttemptsCount, rootStore.state.userTokenInvalidateLock)
                rootStore.state.userTokenInvalidateAttemptsCount++
                rootStore.dispatch('user/refresh').then((resp) => {
                  if (resp.code === 200) {
                    rootStore.state.userTokenInvalidateLock = 0
                    rootStore.state.userTokenInvalidated = resp.result
                    console.info('User token refreshed successfully', resp.result)
                  } else {
                    rootStore.state.userTokenInvalidateLock = -1
                    rootStore.dispatch('user/logout', { silent: true })
                    Vue.prototype.$bus.$emit('modal-show', 'modal-signup')
                    rootStore.dispatch('sync/clearNotTransmited')
                    console.error('Error refreshing user token', resp.result)
                  }
                }).catch((excp) => {
                  rootStore.state.userTokenInvalidateLock = -1
                  rootStore.dispatch('user/logout', { silent: true })
                  Vue.prototype.$bus.$emit('modal-show', 'modal-signup')
                  rootStore.dispatch('sync/clearNotTransmited')
                  console.error('Error refreshing user token', excp)
                })
              }
            }
            if (rootStore.state.userTokenInvalidateAttemptsCount <= AUTO_REFRESH_MAX_ATTEMPTS) _internalExecute(resolve, reject, task, currentToken, currentCartId) // retry
          } else {
            console.info('Invalidation process is disabled (autoRefreshTokens is set to false)')
            rootStore.dispatch('user/logout', { silent: true })
            Vue.prototype.$bus.$emit('modal-show', 'modal-signup')
          }
        }
        if (!task.silent && (jsonResponse.result && jsonResponse.result.code !== 'ENOTFOUND' && !silentMode)) {
          rootStore.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t(jsonResponse.result),
            action1: { label: i18n.t('OK') }
          })
        }
      }
      console.debug('Response for: ' + task.task_id + ' = ' + jsonResponse.result)
      task.transmited = true
      task.transmited_at = new Date()
      task.result = jsonResponse.result
      task.resultCode = jsonResponse.code
      task.code = jsonResponse.code // backward compatibility to fetch()
      task.acknowledged = false

      if (task.callback_event) {
        if (task.callback_event.startsWith('store:')) {
          rootStore.dispatch(task.callback_event.split(':')[1], task)
        } else {
          Vue.prototype.$bus.$emit(task.callback_event, task)
        }
      }
      if (!rootStore.state.userTokenInvalidateLock) { // in case we're revalidaing the token - user must wait for it
        resolve(task)
      }
    } else {
      const msg = i18n.t('Unhandled error, wrong response format!')
      console.error(msg)
      reject(msg)
    }
  }).catch((err) => {
    console.error(err)
    reject(err)
  })
}

export function execute (task: Task, currentToken = null, currentCartId = null): Promise<Task> {
  const taskId = task.task_id

  console.debug('Pushing out task ' + taskId)
  return new Promise((resolve, reject) => {
    _internalExecute(resolve, reject, task, currentToken, currentCartId)
  })
}
