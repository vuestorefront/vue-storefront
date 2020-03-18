import { MutationTree } from 'vuex'
import { mutationsFactory } from '../abstract/mutations'
import * as types from './mutation-types'
import TaskQueueState from '../../types/TaskQueueState'

const mutations: MutationTree<TaskQueueState> = {
  [types.ICMAA_CMS_TASK_ADD]: (state, taskId: string) => {
    if (!state.taskQueue.includes(taskId)) {
      state.taskQueue.push(taskId)
    }
  },
  [types.ICMAA_CMS_TASK_RMV]: (state, taskId: string) => {
    const index = state.taskQueue.findIndex(t => t === taskId)
    if (index !== -1) {
      state.taskQueue.splice(index, 1)
    }
  }
}
export default mutations
