import { isServer } from '@vue-storefront/core/helpers'

/**
  * ValidationError to be used with multiple validation errors return from Ajv or other validators
*/
export class HttpError {
  private message: string
  private code: string | number
  private name: string

  public constructor (message, code) {
    this.message = message
    this.code = code
    this.name = 'ValidationError'
  }
  public toString () {
    return 'HttpError' + this.code + ': ' + this.message
  }
}

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
