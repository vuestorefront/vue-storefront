import { ActionTree } from 'vuex';
import { execute as taskExecute } from '@vue-storefront/store/lib/task'
import * as entities from '@vue-storefront/store/lib/entities'

// actions
export const actions: ActionTree<undefined, any> = {
  fetch ({ commit }, request) {
    const taskId = entities.uniqueEntityId(request)
    request.task_id = taskId.toString()
    return taskExecute(request)
  }
}


