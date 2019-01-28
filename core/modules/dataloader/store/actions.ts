import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import { DataLoaderAction } from './types/DataLoaderAction';
import { DataLoaderActionContext } from './types/DataLoaderActionContext';
import { DataLoaderState } from './types/DataLoaderState'
import { Logger } from '@vue-storefront/core/lib/logger'

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<DataLoaderState, any> = {
  // if you are using cache in your module it's a good practice to allow develoeprs to choose either to use it or not
  push ({ commit }, action: DataLoaderAction) {
    commit(types.PUSH_ACTION, action)
  },
  flush({ state }, actionContext: DataLoaderActionContext) {
    const actionsToExecute = state.actions.filter(ac => (!ac.category || !actionContext.category) || ac.category === actionContext.category && (!ac.executedAt)).map(ac => {
      return ac.execute(actionContext) // function must return Promise
    })
    if (actionsToExecute.length > 0) {
      Logger.info('Executing data lodaer actions(' + actionsToExecute.length + ')', 'dataloader')()
    }
    return Promise.all(actionsToExecute).then(results => {
      actionsToExecute.map(ac => ac.executedAt = new Date())
      return results
    })
  }
}