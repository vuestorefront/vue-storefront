import { createMutatorHook } from '@vue-storefront/core/lib/hooks'

const {
  hook: beforeRedirectToDefaultStoreHook,
  executor: beforeRedirectToDefaultStoreExecutor
} = createMutatorHook<any, any>()

/** Only for internal usage in this module */
const defaultStoreRedirectHooksExecutors = {
  beforeRedirectToDefaultStore: beforeRedirectToDefaultStoreExecutor
}

const defaultStoreRedirectHooks = {
  /** Hook is fired directly before redirecting to the default store. Can be used to add custom logic to determine default store
   * @param storeCode Inside this function you have access to storeCode, which can be modified before returned
  */
  beforeRedirectToDefaultStore: beforeRedirectToDefaultStoreHook
}

export {
  defaultStoreRedirectHooks,
  defaultStoreRedirectHooksExecutors
}
