/**
  Listener hook just fires functions passed to listener function when executor is invoked.
  e. g. We want to listen for onAppInit event in various places of the application.
  Functions passed to this hook will be invoked only when executor function is executed.
  Usually we want to use listener as a hook in app/modules and executor in core.
 */
function createListenerHook () {
  const functionsToRun = []

  function listener (fn) {
    functionsToRun.push(fn)
  }

  function executor () {
    functionsToRun.forEach(fn => fn())
  }

  return {
    listener,
    executor
  }
}

/**
  Mutators work like listeners except they can modify passed value in hooks.
  e.g we can apply the hook mutator to object order that is returned before placing order
  now you can access and modify this value from hook (listener) returned by this function
 */
function createMutatorHook () {
  const mutators = []

  function listener (mutator) {
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
    listener,
    executor
  }
}

export const { listener: onAppInit, executor: appInitExecutor } = createListenerHook()
