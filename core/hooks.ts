import { createListenerHook, createMutatorHook } from '@vue-storefront/module/hooks'

const { hook: beforeStoreViewChangeHook, executor: beforeStoreViewChangeExecutor }: {
  hook: (storeViewMutator: (storeView: any) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterStoreViewChangeHook, executor: afterStoreViewChangeExecutor }: {
  hook: (storeViewListener: (storeView?: any) => void) => void,
  executor: any
} = createListenerHook()

const { hook: afterAppInitHook, executor: afterAppInitExecutor }: {
  hook: (appInitListener: () => void) => void,
  executor: any
} = createListenerHook()

/** Only for internal usage in core */
const coreHooksExecutors = {
  afterAppInit: afterAppInitExecutor,
  beforeStoreViewChange: beforeStoreViewChangeExecutor,
  afterStoreViewChange: afterStoreViewChangeExecutor
}

const coreHooks = {
  /** Hook is fired right after whole application is initialized. Modules are registered and theme setted up */
  afterAppInit: afterAppInitHook,
  /** Hook is fired directly before sending order to the server, after all client-side validations
   * @param orderMutator Inside this function you have access to order object that you can access and modify. It should return order object.
  */
  beforeStoreViewChange: beforeStoreViewChangeHook,
  /** Hook is fired right after order has been sent to server
   * @param result `{ order, task }` task is a result of sending order to backend and order is order that has been sent there
  */
  afterStoreViewChange: afterStoreViewChangeHook
}

export {
  coreHooks,
  coreHooksExecutors
}
