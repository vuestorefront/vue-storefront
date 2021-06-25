import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import { UserProfile } from '@vue-storefront/core/modules/user/types/UserProfile';

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
  hook: afterUserProfileUpdatedHook,
  executor: afterUserProfileUpdatedExecutor
} = createListenerHook<Task>()

const {
  hook: beforeUserProfileUpdateHook,
  executor: beforeUserProfileUpdateExecutor
} = createMutatorHook<UserProfile, any>()

/** Only for internal usage in this module */
const userHooksExecutors = {
  afterUserAuthorize: afterUserAuthorizeExecutor,
  afterUserUnauthorize: afterUserUnauthorizeExecutor,
  afterUserProfileUpdated: afterUserProfileUpdatedExecutor,
  beforeUserProfileUpdate: beforeUserProfileUpdateExecutor
}

const userHooks = {
  /** Hook is fired right after user is authenticated or auth fails.
   * @param response result of user authentication containing status codes and user data
  */
  afterUserAuthorize: afterUserAuthorizeHook,
  /** Hook is fired right after user is logged out.
  */
  afterUserUnauthorize: afterUserUnauthorizeHook,
  /**
   * Hook is fired after user profile is updated ('user/handleUpdateProfile')
   */
  afterUserProfileUpdated: afterUserProfileUpdatedHook,
  /**
   * Hook is fired before user profile is send to update. This can be useful to add additional properties to user profile.
   */
  beforeUserProfileUpdate: beforeUserProfileUpdateHook
}

export {
  userHooks,
  userHooksExecutors
}
