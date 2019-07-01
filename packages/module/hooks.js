"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c;
/**
  Listener hook just fires functions passed to hook function when executor is invoked.
  e. g. We want to listen for onAppInit event in various places of the application.
  Functions passed to this hook will be invoked only when executor function is executed.
  Usually we want to use hook in app/modules and executor in core.
  @return hook:  a hook function to use in modules
  @return executor: a function that will run all the collected hooks
 */
function createListenerHook() {
    var functionsToRun = [];
    function hook(fn) {
        functionsToRun.push(fn);
    }
    function executor(args) {
        if (args === void 0) { args = null; }
        functionsToRun.forEach(function (fn) { return fn(args); });
    }
    return {
        hook: hook,
        executor: executor
    };
}
/**
  Mutators work like listeners except they can modify passed value in hooks.
  e.g we can apply the hook mutator to object order that is returned before placing order
  now you can access and modify this value from hook returned by this function
  @return hook: a hook function to use in modules
  @return executor: a function that will apply all hooks on a given value
 */
function createMutatorHook() {
    var mutators = [];
    function hook(mutator) {
        mutators.push(mutator);
    }
    function executor(rawOutput) {
        var modifiedOutput = null;
        mutators.forEach(function (fn) {
            modifiedOutput = fn(rawOutput);
        });
        return modifiedOutput;
    }
    return {
        hook: hook,
        executor: executor
    };
}
exports.afterAppInitHook = (_a = createListenerHook(), _a.hook), exports.afterAppInitExecutor = _a.executor;
exports.beforePlaceOrderHook = (_b = createMutatorHook(), _b.hook), exports.beforePlaceOrderExecutor = _b.executor;
exports.afterPlaceOrderHook = (_c = createListenerHook(), _c.hook), exports.afterPlaceOrderExecutor = _c.executor;
