import { createListenerHook } from '@vue-storefront/core/lib/hooks'
import { Category } from './types/Category';
import Product from 'core/modules/catalog/types/Product';

const {
  hook: categoryPageVisitedHook,
  executor: categoryPageVisitedExecutor
} = createListenerHook<Category>()

const {
  hook: productPageVisitedHook,
  executor: productPageVisitedExecutor
} = createListenerHook<Product>()

/** Only for internal usage */
const catalogHooksExecutors = {
  categoryPageVisited: categoryPageVisitedExecutor,
  productPageVisited: productPageVisitedExecutor
}

const catalogHooks = {
  /**
   * Hook is fired right after category page is visited.
   * @param category visited category
   */
  categoryPageVisited: categoryPageVisitedHook,
  /**
   * Hook is fired right after product page is visited.
   * @param product visited product
   */
  productPageVisited: productPageVisitedHook
}

export {
  catalogHooks,
  catalogHooksExecutors
}
