import * as entities from '../../lib/entities'

export function _prepareTask (task) {
  const taskId = entities.uniqueEntityId(task) // timestamp as a order id is not the best we can do but it's enough
  task.task_id = taskId.toString()
  task.transmited = false
  task.created_at = new Date()
  task.updated_at = new Date()
  return task
}
