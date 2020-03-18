import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { Logger } from '@vue-storefront/core/lib/logger'
import { cacheStorage as cache } from '../../'
import IcmaaTaskQueue from '../../data-resolver/Task'
import * as types from './mutation-types'

const actions: ActionTree<{}, RootState> = {
  taskQueueSync: ({ dispatch, commit }, task: any): void => {
    if (task.resultCode === 200) {
      const taskId = IcmaaTaskQueue.getTaskId(task.url)

      cache.setItem(taskId, task)
      commit(types.ICMAA_CMS_TASK_RMV, taskId)

      Logger.debug(`Synced task: ${taskId}`, 'icmaa-task-queue', task.url)()

      if (task.real_callback_event) {
        const callbackEvent: string = task.real_callback_event
        if (callbackEvent.startsWith('store:')) {
          dispatch(callbackEvent.split(':')[1], task, { root: true })
        } else {
          EventBus.$emit(callbackEvent, task)
        }
      }
    }
  }
}

export default actions
