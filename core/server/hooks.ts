import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'
import {Express} from 'express';

// To add like tracing which needs to be done as early as possible

const {
  hook: afterProcessStartedHook,
  executor: afterProcessStartedExecutor
} = createListenerHook<any>()

const {
  hook: beforeCacheInvalidatedHook,
  executor: beforeCacheInvalidatedExecutor
} = createListenerHook<any>()

const {
  hook: afterCacheInvalidatedHook,
  executor: afterCacheInvalidatedExecutor
} = createListenerHook<any>()

// beforeStartApp
interface Extend {
  app: Express,
  config: any,
  isProd: boolean
}
const {
  hook: afterApplicationInitializedHook,
  executor: afterApplicationInitializedExecutor
} = createListenerHook<Extend>()

const {
  hook: beforeOutputRenderedHook,
  executor: beforeOutputRenderedExecutor
} = createMutatorHook<any, any>()

const {
  hook: afterOutputRenderedHook,
  executor: afterOutputRenderedExecutor
} = createMutatorHook<any, any>()

/** Only for internal usage in this module */
const serverHooksExecutors = {
  afterProcessStarted: afterProcessStartedExecutor,
  afterApplicationInitialized: afterApplicationInitializedExecutor,
  beforeOutputRendered: beforeOutputRenderedExecutor,
  afterOutputRendered: afterOutputRenderedExecutor,
  beforeCacheInvalidated: beforeCacheInvalidatedExecutor,
  afterCacheInvalidated: afterCacheInvalidatedExecutor
}

const serverHooks = {
  /** Hook is fired right at the start of the app.
   * @param void
   */
  afterProcessStarted: afterProcessStartedHook,
  /**
   *
   */
  afterApplicationInitialized: afterApplicationInitializedHook,
  beforeOutputRendered: beforeOutputRenderedHook,
  afterOutputRendered: afterOutputRenderedHook,
  beforeCacheInvalidated: beforeCacheInvalidatedHook,
  afterCacheInvalidated: afterCacheInvalidatedHook
}

export {
  serverHooks,
  serverHooksExecutors
}
