import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'
import {Express} from 'express';

// To add tracing without adding it directly to the core

const {
  hook: tracingHook,
  executor: tracingExecutor
} = createListenerHook<any>()

// beforeStartApp
interface Extend {
  app: Express,
  config: any,
  isProd: boolean
}
const {
  hook: extendHook,
  executor: extendExecutor
} = createListenerHook<Extend>()

/** Only for internal usage in this module */
const serverHooksExecutors = {
  tracing: tracingExecutor,
  extend: extendExecutor
}

const serverHooks = {
  /** Hook is fired right at the start of the app.
   * @param void
   */
  tracing: tracingHook,
  /**
   *
   */
  extend: extendHook
}

export {
  serverHooks,
  serverHooksExecutors
}
