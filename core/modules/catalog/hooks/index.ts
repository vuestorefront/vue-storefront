import { createMutatorHook, createListenerHook } from '@vue-storefront/core/lib/hooks'
import Product from '../types/Product';

const {
  hook: beforeTaxesCalculatedHook,
  executor: beforeTaxesCalculatedExecutor
} = createMutatorHook<Product[], Product[]>()

const {
  hook: afterSetBundleProductsHook,
  executor: afterSetBundleProductsExecutor
} = createListenerHook<Product[]>()

const {
  hook: afterSetGroupedProductHook,
  executor: afterSetGroupedProductExecutor
} = createListenerHook<Product[]>()

const catalogHooksExecutors = {
  beforeTaxesCalculated: beforeTaxesCalculatedExecutor,
  afterSetBundleProducts: afterSetBundleProductsExecutor,
  afterSetGroupedProduct: afterSetGroupedProductExecutor
}

const catalogHooks = {
  beforeTaxesCalculated: beforeTaxesCalculatedHook,
  afterSetBundleProducts: afterSetBundleProductsHook,
  afterSetGroupedProduct: afterSetGroupedProductHook
}

export {
  catalogHooks,
  catalogHooksExecutors
}
