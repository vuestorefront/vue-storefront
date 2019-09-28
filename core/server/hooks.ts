import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'

// beforeStartApp

const {
  hook: onLoadHook,
  executor: onLoadExecutor
} = createListenerHook<any>()

/** Only for internal usage in this module */
const serverHooksExecutors = {
  onLoad: onLoadExecutor
}

const serverHooks = {
  /** Hook is fired right at the start of the app.
   * @param void
   */
  onLoad: onLoadHook
}

export {
  serverHooks,
  serverHooksExecutors
}
