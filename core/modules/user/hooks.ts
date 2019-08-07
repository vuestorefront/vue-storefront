import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'

const { hook: beforeUserAuthorizeHook, executor: beforePUserAuthorizeExecutor }: {
  hook: (userDataMutator: (user: { username: string, password: string }) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterPUserAuthorizeHook, executor: afterPUserAuthorizeExecutor }: {
  hook: (userDataListener: (response: any) => any) => void,
  executor: any
} = createListenerHook()

/** Only for internal usage in this module */
const userHooksExecutors = {
  beforeUserAuthorize: beforePUserAuthorizeExecutor,
  afterUserAuthorize: afterPUserAuthorizeExecutor
}

const userHooks = {
  /** Hook is fired directly before sending user credentials to the server, before all validations.
   * @param user `{ username, password }` Inside this function you have access to user.name, and user.password that you can modify or just return unchanged.
  */
  beforeUserAuthorize: beforeUserAuthorizeHook,
  /** Hook is fired right after user is authenticated or auth fails.
   * @param response result of user authentication
  */
  afterUserAuthorize: afterPUserAuthorizeHook
}

export {
  userHooks,
  userHooksExecutors
}
