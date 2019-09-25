import { createMutatorHook } from '@vue-storefront/core/lib/hooks'
import Product from '../types/Product';

const {
  hook: beforeTaxesCalculatedHook,
  executor: beforeTaxesCalculatedExecutor
} = createMutatorHook<Product[], Product[]>()

const catalogHooksExecutors = {
  beforeTaxesCalculated: beforeTaxesCalculatedExecutor
}

const catalogHooks = {
  beforeTaxesCalculated: beforeTaxesCalculatedHook
}

export {
  catalogHooks,
  catalogHooksExecutors
}
