import EventBus from 'src/event-bus'
import i18n from 'lib/i18n'

export function execute (task, currentToken = null, currentCartId = null) {
  const taskData = task
  const taskId = task.task_id

  console.log('Pushing out task ' + taskId)
  const url = task.url.replace('{{token}}', (currentToken == null) ? '' : currentToken).replace('{{cartId}}', (currentCartId == null) ? '' : currentCartId)
  return new Promise((resolve, reject) => {
    fetch(url, task.payload).then((response) => {
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
          if (!taskData.silent) {
            EventBus.$emit('notification', {
              type: 'error',
              message: i18n.t(jsonResponse.result),
              action1: { label: 'OK', action: 'close' }
            })
          }
        }
        console.info('Response for: ' + taskId + ' = ' + jsonResponse.result)
        taskData.transmited = true
        taskData.transmited_at = new Date()
        taskData.result = jsonResponse.result
        taskData.resultCode = jsonResponse.code
        taskData.acknowledged = false

        if (taskData.callback_event) {
          EventBus.$emit(taskData.callback_event, taskData)
        }

        resolve(taskData)
      } else {
        const msg = i18n.t('Unhandled error, wrong response format!')
        console.error(msg)
        reject(msg)
      }
    }).catch((err) => {
      console.error(err)
      reject(err)
    })
  })
}
