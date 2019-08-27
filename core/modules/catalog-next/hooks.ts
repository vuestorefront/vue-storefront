import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'
import { Category } from './types/Category';

const { hook: categoryPageVisitedHook, executor: categoryPageVisitedExecutor }: {
  hook: (categoryPageVisitedListener: (category?:Category) => void) => void,
  executor: any
} = createListenerHook()

/** Only for internal usage */
const catalogHooksExecutors = {
  categoryPageVisited: categoryPageVisitedExecutor
}

const catalogHooks = {
  /**
   * Hook is fired right after category page is visited.
   * @param category visited category
   */
  categoryPageVisited: categoryPageVisitedHook
}

export {
  catalogHooks,
  catalogHooksExecutors
}
