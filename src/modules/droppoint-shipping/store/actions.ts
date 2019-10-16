import { ActionTree } from 'vuex';
import { execute as taskExecute } from '@vue-storefront/core/lib/sync/task'
import * as entities from '@vue-storefront/core/store/lib/entities'

// actions
export const actions: ActionTree<any, any> = {
  fetch ({ commit }, request) {
    const taskId = entities.uniqueEntityId(request)
    request.task_id = taskId.toString()
    return taskExecute(request)
  }
}
