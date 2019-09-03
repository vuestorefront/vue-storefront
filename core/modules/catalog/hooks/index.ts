import { createMutatorHook } from '@vue-storefront/core/lib/hooks'
import Product from '../types/Product';

const { hook: beforeTaxesCalculatedHook, executor: beforeTaxesCalculatedExecutor }: {
  hook: (taxesCalculatedMutator: (products: Product[]) => Product[]) => void,
  executor: any
} = createMutatorHook()

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
