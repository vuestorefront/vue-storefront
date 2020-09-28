import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'
import Task from '@vue-storefront/core/lib/sync/types/Task'

// Authorize

const {
  hook: afterUserAuthorizeHook,
  executor: afterUserAuthorizeExecutor
} = createListenerHook<any>()

// Unauthorize

const {
  hook: afterUserUnauthorizeHook,
  executor: afterUserUnauthorizeExecutor
} = createListenerHook()

const {
  hook: afterUserAddressUpdatedHook,
  executor: afterUserAddressUpdatedExecutor
} = createListenerHook<Task>()

/** Only for internal usage in this module */
const userHooksExecutors = {
  afterUserAuthorize: afterUserAuthorizeExecutor,
  afterUserUnauthorize: afterUserUnauthorizeExecutor,
  afterUserAddressUpdated: afterUserAddressUpdatedExecutor
}

const userHooks = {
  /** Hook is fired right after user is authenticated or auth fails.
   * @param response result of user authentication containing status codes and user data
  */
  afterUserAuthorize: afterUserAuthorizeHook,
  /** Hook is fired right after user is logged out.
  */
  afterUserUnauthorize: afterUserUnauthorizeHook,
  afterUserAddressUpdated: afterUserAddressUpdatedHook
}

export {
  userHooks,
  userHooksExecutors
}
