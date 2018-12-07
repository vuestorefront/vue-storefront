/** VS message logger. By default works only on dev mode */
const Logger = {
  /**
   * Inform about succesful events happening in the app 
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.info(...args)()`
   * @param message 
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  info : function (message: string, tag: string = null, context: any = null) : () => void {
    if (typeof window !== 'undefined') {
      if (tag) {
        let msg ='%cVSF%c %c' + tag +'%c ' + message
        return console.log.bind(window.console, '%cVSF%c %c' + tag +'%c ' + message, bgColorStyle('green'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', { context });
      } else {
        return console.log.bind(window.console, '%cVSF%c ' + message, bgColorStyle('green'), 'font-weight: bold', { context });
      }
    } else {
      return function () {}
    }
  },
    /**
   * Inform about potential problems that may be a cause of app break
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.warn(...args)()`
   * @param message 
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  warn: function (message: string, tag: string = null, context: any = null) : () => void {
    if (typeof window !== 'undefined') {
      if (tag) {
        return console.warn.bind(window.console, '%cVSF%c %c' + tag +'%c ' + message, bgColorStyle('orange'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', { context });
      } else {
        return console.warn.bind(window.console, '%cVSF%c ' + message, bgColorStyle('orange'), 'font-weight: bold', { context });
      }
    } else {
      return function () {}
    }
  },
  /**
   * Inform about errors that will break the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.error(...args)()`
   * @param message 
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  error: function (message: string, tag: string = null, context: any = null) : () => void {
    if (typeof window !== 'undefined') {
      if (tag) {
        return console.error.bind(window.console, '%cVSF%c %c' + tag +'%c ' + message, bgColorStyle('red'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', { context });
      } else {
        return console.error.bind(window.console, '%cVSF%c ' + message, bgColorStyle('red'), 'font-weight: bold', { context });
      }
    } else {
      return function () {}
    }
  }
}

const bgColorStyle = (color) => `color: white; background: ${color}; padding: 4px; font-weight: bold; font-size: 0.8em'`

export { Logger } 
