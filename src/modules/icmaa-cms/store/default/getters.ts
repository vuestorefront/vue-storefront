import { GetterTree } from 'vuex'
import TaskQueueState from '../../types/TaskQueueState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<TaskQueueState, RootState> = {
  getTaskQueue: (state): string[] => state.taskQueue,
  getTaskById: (state) => (id: string) => state.taskQueue.find(t => t === id)
}

export default getters
