import { cacheStorage as cache } from '../'

import { Logger } from '@vue-storefront/core/lib/logger'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import rootStore from '@vue-storefront/core/store'

const createQueryString: Function = (params: Record<string, any>): string =>
  Object.keys(params).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&')

const getHash: Function = (s: string): number => Math.abs(s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0))

const getTaskId: Function = (s: string): string => `task-${getHash(s)}`

const IcmaaTaskQueue = {

  async execute (task: Record<string, any>): Promise<Task> {
    const taskId = getTaskId(task.url)
    return cache.getItem(taskId)
      .then(result => {
        if (!result) {
          return TaskQueue.execute(task).then(resp => {
            Logger.debug(`Fetched task: ${taskId}`, 'icmaa-task-queue', resp)()

            if (resp.resultCode === 200) {
              cache.setItem(taskId, resp)
              return resp
            }

            return false
          })
        }

        Logger.debug(`Found task in cache: ${taskId}`, 'icmaa-task-queue', result)()

        return result
      })
  },

  async queue (task: Record<string, any>): Promise<Task|any> {
    Object.assign(
      task,
      {
        real_callback_event: task.callback_event,
        callback_event: 'store:icmaaCms/taskQueueSync'
      }
    )

    const taskId = getTaskId(task.url)
    const cacheItem = await cache.getItem(taskId)
    if (cacheItem) {
      rootStore.dispatch('icmaaCms/taskQueueSync', task)
    } else {
      return TaskQueue.queue(task)
    }
  },

  createQueryString,
  getHash,
  getTaskId
}

export default IcmaaTaskQueue
