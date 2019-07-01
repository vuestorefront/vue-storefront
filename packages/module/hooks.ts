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

  function hook (fn: () => void) {
    functionsToRun.push(fn)
  }

  function executor (args = null) {
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

  function hook (mutator: (arg: any) => void) {
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

export const { hook: afterAppInitHook, executor: afterAppInitExecutor } = createListenerHook()
export const { hook: beforePlaceOrderHook, executor: beforePlaceOrderExecutor } = createMutatorHook()
export const { hook: afterPlaceOrderHook, executor: afterPlaceOrderExecutor } = createListenerHook()
