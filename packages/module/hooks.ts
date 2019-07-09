/**
  Listener hook just fires functions passed to hook function when executor is invoked.
  e. g. We want to listen for onAppInit event in various places of the application.
  Functions passed to this hook will be invoked only when executor function is executed.
  Usually we want to use hook in app/modules and executor in core.
  @return hook:  a hook function to use in modules
  @return executor: a function that will run all the collected hooks
 */
function createListenerHook () {
  const functionsToRun: Array<(arg: any) => void> = []

  function hook (fn: (arg?: any) => void) {
    functionsToRun.push(fn)
  }

  function executor (args: any = null) {
    functionsToRun.forEach(fn => fn(args))
  }

  return {
    hook,
    executor
  }
}

/**
  Mutators work like listeners except they can modify passed value in hooks.
  e.g we can apply the hook mutator to object order that is returned before placing order
  now you can access and modify this value from hook returned by this function
  @return hook: a hook function to use in modules
  @return executor: a function that will apply all hooks on a given value
 */
function createMutatorHook () {
  const mutators: Array<(arg: any) => void>  = []

  function hook (mutator: (arg: any) => any) {
    mutators.push(mutator)
  }

  function executor (rawOutput: any) {
    let modifiedOutput = null
    mutators.forEach(fn => {
      modifiedOutput = fn(rawOutput)
    })
    return modifiedOutput
  }

  return {
    hook,
    executor
  }
}

const afterAppInitGen = createListenerHook()
const beforePlaceOrderGen = createMutatorHook()
const afterPlaceOrderGen = createListenerHook()
const beforeStoreViewChangeGen = createMutatorHook()
const afterStoreViewChangeGen = createListenerHook()

/** Hook is fired right after whole application is initialized. Modules are registered and theme setted up */
export const afterAppInit = afterAppInitGen.hook
export const afterAppInitExecutor = afterAppInitGen.executor

/** Hook is fired directly before sending order to the server, after all client-side validations 
 * @param orderMutator Inside this function you have access to order object that you can access and modify. It should return order object.
*/
export const beforePlaceOrder: (orderMutator: (order: {}) => {}) => void = beforePlaceOrderGen.hook
export const beforePlaceOrderExecutor = beforePlaceOrderGen.executor
 
/** Hook is fired right after order has been sent to server  */
export const afterPlaceOrder: (orderListener: ({ order: {}, task: {} }) => void) => void = afterPlaceOrderGen.hook
export const afterPlaceOrderExecutor = afterPlaceOrderGen.executor

export const beforeStoreViewChange:  (storeViewMutator: (storeView: {}) => {}) => void = beforeStoreViewChangeGen.hook
export const beforeStoreViewChangeExecutor = beforeStoreViewChangeGen.executor

export const afterStoreViewChange: (storeViewListener: (storeView: {}) => {}) => void = afterStoreViewChangeGen.hook
export const afterStoreViewChangeExecutor = afterStoreViewChangeGen.executor

// Client entry, replaceState, shopping cart loaded, user logged