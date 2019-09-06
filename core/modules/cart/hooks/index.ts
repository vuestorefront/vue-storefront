import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'
import CartItem from '../types/CartItem';

const { hook: beforeSyncHook, executor: beforeSyncExecutor }: {
  hook: (syncMutator: (cart: { clientItems: CartItem[], serverItems: CartItem[] }) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterSyncHook, executor: afterSyncExecutor }: {
  hook: (syncListener: (response: any) => any) => void,
  executor: any
} = createListenerHook()

const { hook: beforeAddToCartHook, executor: beforeAddToCartExecutor }: {
  hook: (addToCartMutator: (cart: { cartItem: CartItem }) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterAddToCartHook, executor: afterAddToCartExecutor }: {
  hook: (AddToCartListener: (response: any) => any) => void,
  executor: any
} = createListenerHook()

const { hook: beforeRemoveFromCartHook, executor: beforeRemoveFromCartExecutor }: {
  hook: (removeFromCartMutator: (cart: { cartItem: CartItem }) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterRemoveFromCartHook, executor: afterRemoveFromCartExecutor }: {
  hook: (removeFromCartCartListener: (response: any) => any) => void,
  executor: any
} = createListenerHook()

const { hook: beforeMergeHook, executor: beforeMergeExecutor }: {
  hook: (syncMutator: (cart: { clientItems: CartItem[], serverItems: CartItem[] }) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterLoadHook, executor: afterLoadExecutor }: {
  hook: (removeFromCartCartListener: (response: any) => any) => void,
  executor: any
} = createListenerHook()

const cartHooksExecutors = {
  beforeSync: beforeSyncExecutor,
  afterSync: afterSyncExecutor,
  beforeAddToCart: beforeAddToCartExecutor,
  afterAddToCart: afterAddToCartExecutor,
  beforeRemoveFromCart: beforeRemoveFromCartExecutor,
  afterRemoveFromCart: afterRemoveFromCartExecutor,
  beforeMerge: beforeMergeExecutor,
  afterLoad: afterLoadExecutor
}

const cartHooks = {
  beforeSync: beforeSyncHook,
  afterSync: afterSyncHook,
  beforeAddToCart: beforeAddToCartHook,
  afterAddToCart: afterAddToCartHook,
  beforeRemoveFromCart: beforeRemoveFromCartHook,
  afterRemoveFromCart: afterRemoveFromCartHook,
  beforeMerge: beforeMergeHook,
  afterLoad: afterLoadHook
}

export {
  cartHooks,
  cartHooksExecutors
}
