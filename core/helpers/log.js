import { isServer } from '@vue-storefront/core/helpers'

/**
 * @param {string} level available options: 'no-console', 'only-errors', 'all'
 */
export function takeOverConsole (level = 'no-console') {
  const console = !isServer ? window.console : global.console
  if (!console) return

  function intercept (method) {
    const original = console[method]
    console[method] = function () {
      let filterMethods = []

      if (level === 'no-console') {
        filterMethods = ['warn', 'debug', 'log', 'error']
      }
      if (level === 'only-errors') {
        filterMethods = ['warn', 'debug', 'log']
      }

      if (filterMethods.indexOf(method) >= 0) {
        return
      }
      // do sneaky stuff
      if (original.apply) {
        // Do this for normal browsers
        original.apply(console, arguments)
      } else {
        // Do this for IE
        const message = Array.prototype.slice.apply(arguments).join(' ')
        original(message)
      }
    }
  }
  const methods = ['log', 'warn', 'error', 'debug']
  for (let i = 0; i < methods.length; i++) {
    intercept(methods[i])
  }
}
