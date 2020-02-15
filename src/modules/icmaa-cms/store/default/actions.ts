import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { cacheStorage as cache } from '../../'
import IcmaaTaskQueue from '../../data-resolver/Task'

const actions: ActionTree<{}, RootState> = {
  taskQueueSync: ({ dispatch }, task: any): void => {
    if (task.resultCode === 200) {
      const taskId = IcmaaTaskQueue.getTaskId(task.url)
      cache.setItem(taskId, task)

      if (task.real_callback_event) {
        const callbackEvent: string = task.real_callback_event
        if (callbackEvent.startsWith('store:')) {
          dispatch(callbackEvent.split(':')[1], task)
        } else {
          EventBus.$emit(callbackEvent, task)
        }
      }
    }
  }
}

export default actions
