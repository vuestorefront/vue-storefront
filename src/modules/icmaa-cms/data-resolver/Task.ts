import { cacheStorage as cache } from '../'

import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { Logger } from '@vue-storefront/core/lib/logger'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import rootStore from '@vue-storefront/core/store'

import { defaultStateKey } from '../store/default'
import * as types from '../store/default/mutation-types'

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
            Logger.debug(`Fetched task: ${taskId}`, 'icmaa-task-queue', task.url)()

            if (resp.resultCode === 200) {
              cache.setItem(taskId, resp)
              return resp
            }

            return false
          })
        }

        Logger.debug(`Found task in cache: ${taskId}`, 'icmaa-task-queue', task.url)()

        return result
      })
  },

  async queue (task: Record<string, any>): Promise<Task|any> {
    const taskId = getTaskId(task.url)
    Object.assign(
      task,
      {
        real_callback_event: task.callback_event,
        callback_event: 'store:icmaaCms/taskQueueSync'
      }
    )

    if (rootStore.getters[`${defaultStateKey}/getTaskById`](taskId)) {
      return task
    }

    Logger.debug(`Queued task: ${taskId}`, 'icmaa-task-queue', task.url)()

    const cacheItem = await cache.getItem(taskId)
    if (cacheItem) {
      rootStore.dispatch(`${defaultStateKey}/taskQueueSync`, cacheItem)
    } else {
      rootStore.commit(`${defaultStateKey}/${types.ICMAA_CMS_TASK_ADD}`, taskId)
      return TaskQueue.queue(task)
    }
  },

  createQueryString,
  getHash,
  getTaskId
}

export default IcmaaTaskQueue
