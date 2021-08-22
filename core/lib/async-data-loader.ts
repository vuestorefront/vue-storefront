/**
* @deprecated This module has been created before Vue.js v2.6.0. From 2.6.x on please do preferably use the `serverPrefetch` hook to sync SSR Vuex data. More info: https://ssr.vuejs.org/api/#serverprefetch
* @description Please note: This module can be used not only for `asyncData` extensibility but also for simplyfying the data loaders in Vuex actions or other components - basicaly everywhere where we must `wait` for some async operations to complete.
*/
import { Logger } from '@vue-storefront/core/lib/logger'
import { Context } from './../scripts/utils/types'

export const DEFAULT_ACTION_CATEGORY = 'asyncData'
// Data loader queues all the data fetching operations and runs them at once - to be usedf for example in the `asyncData()` functions
export interface AsyncDataLoaderActionContext {
  category?: string,
  route: any,
  store: any,
  context: Context
}

// Data loader queues all the data fetching operations and runs them at once - to be usedf for example in the `asyncData()` functions
export interface AsyncDataLoaderAction {
  execute: (args: AsyncDataLoaderActionContext) => Promise<void>, // this function must return a Promise
  category?: string,
  name?: string,
  executedAt?: Date,
  scheduledAt?: Date
}

/** AsyncDataLoader helper for queueing the data fetching operations. The main purpose is to decentralize the `asyncData()` SSR method */
export const AsyncDataLoader = {

  queue: new Array<AsyncDataLoaderAction>(),

  push: function (action: AsyncDataLoaderAction) {
    if (!action.category) action.category = DEFAULT_ACTION_CATEGORY
    action.scheduledAt = new Date()
    this.queue.push(action)
  },
  flush: function (actionContext: AsyncDataLoaderActionContext) {
    const actionsToExecute = this.queue.filter(ac => {
      const isCategoryEmpty = !ac.category || !actionContext.category
      const categoryMatchesAndNotExecuted = ac.category === actionContext.category && !ac.executedAt
      return isCategoryEmpty || categoryMatchesAndNotExecuted;
    });
    const actionsExecutePromises = actionsToExecute.map(ac => {
      ac.executedAt = new Date()
      return ac.execute(actionContext) // function must return Promise
    })
    if (actionsExecutePromises.length > 0) {
      Logger.info(`Executing data loader actions(${actionsExecutePromises.length})`, 'dataloader')()
    }
    return Promise.all(actionsExecutePromises)
  }
}
