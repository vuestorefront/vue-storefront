import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'
import { Express, Request } from 'express'
import http from 'http'

// To add like tracing which needs to be done as early as possible

const {
  hook: afterProcessStartedHook,
  executor: afterProcessStartedExecutor
} = createListenerHook<any>()

interface BeforeCacheInvalidatedParamter {
  tags: string[],
  req: Request
}

interface AfterCacheInvalidatedParamter {
  tags: string[],
  req: Request
}

const {
  hook: beforeCacheInvalidatedHook,
  executor: beforeCacheInvalidatedExecutor
} = createListenerHook<BeforeCacheInvalidatedParamter>()

const {
  hook: afterCacheInvalidatedHook,
  executor: afterCacheInvalidatedExecutor
} = createListenerHook<AfterCacheInvalidatedParamter>()

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

interface Server {
  server: http.Server,
  config: any,
  isProd: boolean
}

const {
  hook: httpServerIsReadyHook,
  executor: httpServerIsReadyExecutor
} = createListenerHook<Server>()

interface Exception {
  err: Exception,
  req: Request,
  isProd: boolean
}

const {
  hook: ssrExceptionHook,
  executor: ssrExceptionExecutor
} = createListenerHook<Exception>()

const {
  hook: beforeOutputRenderedResponseHook,
  executor: beforeOutputRenderedResponseExecutor
} = createMutatorHook<any, any>()

const {
  hook: afterOutputRenderedResponseHook,
  executor: afterOutputRenderedResponseExecutor
} = createMutatorHook<any, any>()

/** Only for internal usage in this module */
const serverHooksExecutors = {
  afterProcessStarted: afterProcessStartedExecutor,
  afterApplicationInitialized: afterApplicationInitializedExecutor,
  httpServerIsReady: httpServerIsReadyExecutor,
  ssrException: ssrExceptionExecutor,
  beforeOutputRenderedResponse: beforeOutputRenderedResponseExecutor,
  afterOutputRenderedResponse: afterOutputRenderedResponseExecutor,
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
  httpServerIsReady: httpServerIsReadyHook,
  ssrException: ssrExceptionHook,
  beforeOutputRenderedResponse: beforeOutputRenderedResponseHook,
  afterOutputRenderedResponse: afterOutputRenderedResponseHook,
  beforeCacheInvalidated: beforeCacheInvalidatedHook,
  afterCacheInvalidated: afterCacheInvalidatedHook
}

export {
  serverHooks,
  serverHooksExecutors
}
