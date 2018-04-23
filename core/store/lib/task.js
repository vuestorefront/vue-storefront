import EventBus from './event-bus'
import i18n from './i18n'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import rootStore from '../'

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
          console.error('Invalid token - need to be revalidated', currentToken)
          global.$VS.tokenInvalidateLock = _.isNumber(global.$VS.userTokenInvalidateLock) ? global.$VS.userTokenInvalidateLock++ : 1
          rootStore.dispatch('user/refresh').then((resp) => {
            if (resp.code === 200) {
              global.$VS.userTokenInvalidated = resp.result
              console.error('User token refreshed successfully', resp.result)
            } else {
              console.error('Error refreshing user token', resp.result)
            }
          })
        }
        if (!task.silent && (jsonResponse.result && jsonResponse.result.code !== 'ENOTFOUND')) {
          EventBus.$emit('notification', {
            type: 'error',
            message: i18n.t(jsonResponse.result),
            action1: { label: 'OK', action: 'close' }
          })
        }
      }
      console.info('Response for: ' + task.task_id + ' = ' + jsonResponse.result)
      task.transmited = true
      task.transmited_at = new Date()
      task.result = jsonResponse.result
      task.resultCode = jsonResponse.code
      task.acknowledged = false

      if (task.callback_event) {
        EventBus.$emit(task.callback_event, task)
      }

      resolve(task)
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
