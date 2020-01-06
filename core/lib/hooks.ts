/**
  Listener hook just fires functions passed to hook function when executor is invoked.
  e. g. We want to listen for onAppInit event in various places of the application.
  Functions passed to this hook will be invoked only when executor function is executed.
  Usually we want to use hook in app/modules and executor in core.
  @return hook:  a hook function to use in modules
  @return executor: a function that will run all the collected hooks
 */
function createListenerHook<T> () {
  const functionsToRun: ((arg: T) => void)[] = []

  function hook (fn: (arg?: T) => void) {
    functionsToRun.push(fn)
  }

  function executor (args: T = null): void {
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
function createMutatorHook<T, R> () {
  const mutators: ((arg: T) => R)[] = []

  function hook (mutator: (arg: T) => R) {
    mutators.push(mutator)
  }

  function executor (rawOutput: T): T | R {
    if (mutators.length > 0) {
      let modifiedOutput: R = null
      mutators.forEach(fn => {
        modifiedOutput = fn(rawOutput)
      })
      return modifiedOutput
    } else {
      return rawOutput
    }
  }

  return {
    hook,
    executor
  }
}

export {
  createListenerHook,
  createMutatorHook
}

// TODO: Hooks for Client entry, replaceState (can be part of client entry), shopping cart loaded, user logged
