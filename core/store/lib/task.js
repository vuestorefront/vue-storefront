import EventBus from './event-bus'
import i18n from './i18n'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import rootStore from '../'
import config from './config'
const AUTO_REFRESH_MAX_ATTEMPTS = 20

function _sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function _internalExecute (resolve, reject, task, currentToken, currentCartId) {
  if (currentToken !== null && global.$VS.userTokenInvalidateLock) { // invalidate lock set
    console.log('Waiting for global.$VS.userTokenInvalidateLock to release for', task.url)
    _sleep(1000).then(() => {
      console.log('Another try for global.$VS.userTokenInvalidateLock for ', task.url)
      _internalExecute(resolve, reject, task, currentToken, currentCartId)
    })

    return // return but not resolve
  } else {
    if (global.$VS.userTokenInvalidated) {
      console.log('Using new user token', global.$VS.userTokenInvalidated)
      currentToken = global.$VS.userTokenInvalidated
    }
  }
  const url = task.url.replace('{{token}}', (currentToken == null) ? '' : currentToken).replace('{{cartId}}', (currentCartId == null) ? '' : currentCartId)
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
        let resultString = jsonResponse.result ? _.toString(jsonResponse.result) : null
        if (resultString && (resultString.indexOf(i18n.t('not authorized')) >= 0 || resultString.indexOf('not authorized')) >= 0 && currentToken !== null) { // the token is no longer valid, try to invalidate it
          console.error('Invalid token - need to be revalidated', currentToken, task.url, global.$VS.userTokenInvalidateLock)
          if (_.isNaN(global.$VS.userTokenInvalidateAttemptsCount) || _.isUndefined(global.$VS.userTokenInvalidateAttemptsCount)) global.$VS.userTokenInvalidateAttemptsCount = 0
          if (_.isNaN(global.$VS.userTokenInvalidateLock) || _.isUndefined(global.$VS.userTokenInvalidateLock)) global.$VS.userTokenInvalidateLock = 0

          silentMode = true
          if (config.users.autoRefreshTokens) {
            if (!global.$VS.userTokenInvalidateLock) {
              global.$VS.userTokenInvalidateLock++
              if (global.$VS.userTokenInvalidateAttemptsCount > AUTO_REFRESH_MAX_ATTEMPTS) {
                console.error('Internal Application error while refreshing the tokens. Please clear the storage and refresh page.')
                rootStore.dispatch('user/logout', { silent: true })
                rootStore.dispatch('sync/clearNotTransmited')
                EventBus.$emit('modal-show', 'modal-signup')
                EventBus.$emit('notification', {
                  type: 'error',
                  message: i18n.t('Internal Application error while refreshing the tokens. Please clear the storage and refresh page.'),
                  action1: { label: i18n.t('OK'), action: 'close' }
                })
                global.$VS.userTokenInvalidateAttemptsCount = 0
              } else {
                console.info('Invalidation process in progress (autoRefreshTokens is set to true)', global.$VS.userTokenInvalidateAttemptsCount, global.$VS.userTokenInvalidateLock)
                global.$VS.userTokenInvalidateAttemptsCount++
                rootStore.dispatch('user/refresh').then((resp) => {
                  if (resp.code === 200) {
                    global.$VS.userTokenInvalidateLock = 0
                    global.$VS.userTokenInvalidated = resp.result
                    console.info('User token refreshed successfully', resp.result)
                  } else {
                    global.$VS.userTokenInvalidateLock = 0
                    rootStore.dispatch('user/logout', { silent: true })
                    EventBus.$emit('modal-show', 'modal-signup')
                    rootStore.dispatch('sync/clearNotTransmited')
                    console.error('Error refreshing user token', resp.result)
                  }
                })
              }
            }
            if (global.$VS.userTokenInvalidateAttemptsCount <= AUTO_REFRESH_MAX_ATTEMPTS) _internalExecute(resolve, reject, task, currentToken, currentCartId) // retry
          } else {
            console.info('Invalidation process is disabled (autoRefreshTokens is set to false)')
            rootStore.dispatch('user/logout', { silent: true })
            EventBus.$emit('modal-show', 'modal-signup')
          }
        }
        if (!task.silent && (jsonResponse.result && jsonResponse.result.code !== 'ENOTFOUND' && !silentMode)) {
          EventBus.$emit('notification', {
            type: 'error',
            message: i18n.t(jsonResponse.result),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
        }
      }
      console.info('Response for: ' + task.task_id + ' = ' + jsonResponse.result)
      task.transmited = true
      task.transmited_at = new Date()
      task.result = jsonResponse.result
      task.resultCode = jsonResponse.code
      task.code = jsonResponse.code // backward compatibility to fetch()
      task.acknowledged = false

      if (task.callback_event) {
        EventBus.$emit(task.callback_event, task)
      }
      if (!global.$VS.userTokenInvalidateLock) { // in case we're revalidaing the token - user must wait for it
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

export function execute (task, currentToken = null, currentCartId = null) {
  const taskId = task.task_id

  console.log('Pushing out task ' + taskId)
  return new Promise((resolve, reject) => {
    _internalExecute(resolve, reject, task, currentToken, currentCartId)
  })
}
