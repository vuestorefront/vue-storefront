import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'

const { hook: beforePlaceOrderHook, executor: beforePlaceOrderExecutor }: {
  hook: (orderMutator: (order: any) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterPlaceOrderHook, executor: afterPlaceOrdeExecutor }: {
  hook: (orderListener: (result: { order: any, task: any }) => void) => void,
  executor: any
} = createListenerHook()

/** Only for internal usage in this module */
const orderHooksExecutors = {
  beforePlaceOrder: beforePlaceOrderExecutor,
  afterPlaceOrder: afterPlaceOrdeExecutor
}

const orderHooks = {
  /** Hook is fired directly before sending order to the server, after all client-side validations
   * @param order Inside this function you have access to order object that you can access and modify. It should return order object.
  */
  beforePlaceOrder: beforePlaceOrderHook,
  /** Hook is fired right after order has been sent to server
   * @param result `{ order, task }` task is a result of sending order to backend and order is order that has been sent there
  */
  afterPlaceOrder: afterPlaceOrderHook
}

export {
  orderHooks,
  orderHooksExecutors
}
