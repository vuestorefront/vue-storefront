import { isServer } from '@vue-storefront/core/helpers'
import buildTimeConfig from 'config'
const bgColorStyle = (color) => `color: white; background: ${color}; padding: 4px; font-weight: bold; font-size: 0.8em'`

/** VS message logger. By default works only on dev mode */
class Logger {
  /**
   * Logger verbosity level
   */
  public verbosityLevel: string;

  /**
   * Is production environment
   */
  public isProduction: boolean;

  /**
   * Force to show error on production
   */
  public showErrorOnProduction: boolean;

  /**
   * Logger constructor
   *
   * @param verbosityLevel
   * @param showErrorOnProduction
   */
  public constructor (verbosityLevel: string = 'display-everything', showErrorOnProduction: boolean = false) {
    this.verbosityLevel = verbosityLevel
    this.showErrorOnProduction = showErrorOnProduction
    this.isProduction = process.env.NODE_ENV === 'production'
  }

  /**
   * Convert message to string - as it may be object, array either primitive
   * @param payload
   */
  public convertToString (payload: any) {
    if (typeof payload === 'string' || typeof payload === 'boolean' || typeof payload === 'number') return payload
    if (payload && payload.message) return payload.message
    return JSON.stringify(payload)
  }

  /**
   * Check if method can print into console
   *
   * @param {string} method
   */
  public canPrint (method: string) {
    const allowedMethods = []

    if (this.verbosityLevel === 'display-everything' && this.isProduction === false) {
      allowedMethods.push(...['info', 'warn', 'error', 'debug'])
    } else if (this.verbosityLevel === 'only-errors' && (this.isProduction === false || this.showErrorOnProduction === true)) {
      allowedMethods.push('error')
    }

    return allowedMethods.indexOf(method) !== -1
  }

  /**
   * Inform about debug events happening in the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.debug(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  public debug (message: any, tag: string = null, context: any = null): () => void {
    if (!this.canPrint('debug')) {
      return () => {}
    }

    if (isServer) {
      return console.debug.bind(console, (tag ? `[${tag}] ` : '') + this.convertToString(message), context)
    }

    if (tag) {
      return console.debug.bind(window.console, '%cVSF%c %c' + tag + '%c ' + this.convertToString(message), bgColorStyle('grey'), 'color: inherit', bgColorStyle('gray'), 'font-weight: normal', context)
    } else {
      return console.debug.bind(window.console, '%cVSF%c ' + this.convertToString(message), bgColorStyle('grey'), 'font-weight: normal', context)
    }
  }

  /**
   * Inform about log events happening in the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.log(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  public log (message: any, tag: string = null, context: any = null): () => void {
    return this.info(message, tag, context)
  }

  /**
   * Inform about succesful events happening in the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.info(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  public info (message: any, tag: string = null, context: any = null): () => void {
    if (!this.canPrint('info')) {
      return () => {}
    }

    if (isServer) {
      return console.log.bind(console, (tag ? `[${tag}] ` : '') + this.convertToString(message), context)
    }

    if (tag) {
      return console.log.bind(window.console, '%cVSF%c %c' + tag + '%c ' + this.convertToString(message), bgColorStyle('green'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', context)
    } else {
      return console.log.bind(window.console, '%cVSF%c ' + this.convertToString(message), bgColorStyle('green'), 'font-weight: bold', context)
    }
  }

  /**
   * Inform about potential problems that may be a cause of app break
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.warn(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  public warn (message: any, tag: string = null, context: any = null): () => void {
    if (!this.canPrint('warn')) {
      return () => {}
    }
    if (isServer) {
      return console.warn.bind(console, (tag ? `[${tag}] ` : '') + this.convertToString(message), context)
    }

    if (tag) {
      return console.warn.bind(window.console, '%cVSF%c %c' + tag + '%c ' + this.convertToString(message), bgColorStyle('orange'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', context)
    } else {
      return console.warn.bind(window.console, '%cVSF%c ' + this.convertToString(message), bgColorStyle('orange'), 'font-weight: bold', context)
    }
  }

  /**
   * Inform about errors that will break the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.error(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  public error (message: any, tag: string = null, context: any = null): () => void {
    if (isServer) { // always show errors in SSR
      return console.error.bind(console, (tag ? `[${tag}] ` : '') + this.convertToString(message), context)
    }

    if (this.canPrint('error')) {
      if (tag) {
        return console.error.bind(window.console, '%cVSF%c %c' + tag + '%c ' + this.convertToString(message), bgColorStyle('red'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', context)
      } else {
        return console.error.bind(window.console, '%cVSF%c ' + this.convertToString(message), bgColorStyle('red'), 'font-weight: bold', context)
      }
    }

    return () => {}
  }
}

const logger = new Logger(
  buildTimeConfig.console.verbosityLevel,
  buildTimeConfig.console.showErrorOnProduction
)

export { logger as Logger }
