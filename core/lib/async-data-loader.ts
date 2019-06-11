/**
* @deprecated This module has been created before Vue.js v2.6.0. From 2.6.x on please do preferably use the `serverPrefetch` hook to sync SSR Vuex data. More info: https://ssr.vuejs.org/api/#serverprefetch
* @description Please note: This module can be used not only for `asyncData` extensibility but also for simplyfying the data loaders in Vuex actions or other components - basicaly everywhere where we must `wait` for some async operations to complete.
*/
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

const DEFAULT_ACTION_CATEGORY = 'asyncData'
// Data loader queues all the data fetching operations and runs them at once - to be usedf for example in the `asyncData()` functions
export interface AsyncDataLoaderActionContext {
  category?: string,
  route: any,
  store: any,
  context: any
}

// Data loader queues all the data fetching operations and runs them at once - to be usedf for example in the `asyncData()` functions
export interface AsyncDataLoaderAction {
  execute: any, // this function must return a Promise
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
    if (!actionContext.category) actionContext.category = DEFAULT_ACTION_CATEGORY
    const actionsToExecute = this.queue.filter(ac => (!ac.category || !actionContext.category) || (ac.category === actionContext.category && (!ac.executedAt))).map(ac => {
      ac.executedAt = new Date()
      return ac.execute(actionContext) // function must return Promise
    })
    if (actionsToExecute.length > 0) {
      Logger.info('Executing data loader actions(' + actionsToExecute.length + ')', 'dataloader')()
    }
    return Promise.all(actionsToExecute).then(results => {
      return results
    })
  }
}
