/**
  Listener hook just fires functions passed to hook function when executor is invoked.
  e. g. We want to listen for onAppInit event in various places of the application.
  Functions passed to this hook will be invoked only when executor function is executed.
  Usually we want to use hook in app/modules and executor in core.
 */
function createListenerHook () {
  const functionsToRun = []

  function hook (fn) {
    functionsToRun.push(fn)
  }

  function executor (args?) {
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
 */
function createMutatorHook () {
  const mutators = []

  function hook (mutator) {
    mutators.push(mutator)
  }

  function executor (rawOutput) {
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
