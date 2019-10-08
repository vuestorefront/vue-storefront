import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'

// Authorize

const { hook: afterUserAuthorizeHook, executor: afterUserAuthorizeExecutor }: {
  hook: (afterAuthorizeListener: (response: any) => any) => void,
  executor: any
} = createListenerHook()

// Unauthorize

const { hook: afterUserUnauthorizeHook, executor: afterUserUnauthorizeExecutor }: {
  hook: (afterUnathorizeListener: () => void) => void,
  executor: any
} = createListenerHook()

/** Only for internal usage in this module */
const userHooksExecutors = {
  afterUserAuthorize: afterUserAuthorizeExecutor,
  afterUserUnauthorize: afterUserUnauthorizeExecutor
}

const userHooks = {
  /** Hook is fired right after user is authenticated or auth fails.
   * @param response result of user authentication containing status codes and user data
  */
  afterUserAuthorize: afterUserAuthorizeHook,
  /** Hook is fired right after user is logged out.
  */
  afterUserUnauthorize: afterUserUnauthorizeHook
}

export {
  userHooks,
  userHooksExecutors
}
