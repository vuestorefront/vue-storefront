import StackTrace from 'stacktrace-js'

const bgColorStyle = (color) => `color: white; background: ${color}; padding: 4px; font-weight: bold; font-size: 0.8em'`

class VueStorefrontLogger {
  private mode: string;
  constructor () {
    this.mode = process.env.NODE_ENV
  }
  /** 
   * Inform about something that happened in the app (for example client/server/cache itneractions). 
   * Provide meaningful data into `context` for easier debugging
   */
  public info (message: string, properties?:  {
    tag?: string
    context?: { label: string, value: any }
  }) : void {
    if (this.mode !== 'production' && typeof window !== 'undefined') {
      StackTrace.get().then(trace => {
        trace.shift() // remove unnecessary stack frame to logger
        if (properties && properties.tag) {
          console.groupCollapsed('%cVSF%c %c' + properties.tag +'%c ' + message,
          bgColorStyle('green'), 'color: inherit', bgColorStyle('gray'), 'color: inherit')
        } else {
          console.groupCollapsed('%cVSF%c ' + message,
          bgColorStyle('green'), 'color: inherit')
        }
        if (trace.length > 1) {
          console.log('%cSource:%c ' + 'webpack:///.'+trace[1].fileName.substring(10) + ':' + trace[1].lineNumber, 'font-weight: bold', 'font-weight: normal')
          console.log('%cStack trace:', 'font-weight: bold', trace)
        }
        if (properties && properties.context) {
          console.log('%c' + properties.context.label + ' ', 'font-weight: bold', properties.context.value)
        }
        console.groupEnd()
      })
    }
  }

  /** 
   * Warn develoeprs about things that may cause some problems 
   * Provide meaningful data into `context` for easier debugging
  * */
  public warn (message: string, properties?:  {
    tag?: string
    context?: { label: string, value: any }
  }) : void {
    if (this.mode !== 'production' && typeof window !== 'undefined') {
      StackTrace.get().then(trace => {
        trace.shift() // remove unnecessary stack frame to logger
        if (properties && properties.tag) {
          console.groupCollapsed('%cVSF%c %c' + properties.tag +'%c ' + message,
          bgColorStyle('orange'), 'color: inherit', bgColorStyle('gray'), 'color: inherit')
        } else {
          console.groupCollapsed('%cVSF%c ' + message,
          bgColorStyle('orange'), 'color: inherit')
        }
        if (trace.length > 1) {
          console.log('%cSource:%c ' + 'webpack:///.'+trace[1].fileName.substring(10) + ':' + trace[1].lineNumber, 'font-weight: bold', 'font-weight: normal')
          console.log('%cStack trace:', 'font-weight: bold', trace)
        }
        if (properties && properties.context) {
          console.log('%c' + properties.context.label + ' ', 'font-weight: bold', properties.context.value)
        }
        console.groupEnd()
      })
    }
  }
  public error (message: string, properties?:  {
    tag?: string
    context?: { label: string, value: any }
  }) : void {
    if (this.mode !== 'production' && typeof window !== 'undefined') {
      StackTrace.get().then(trace => {
        trace.shift() // remove unnecessary stack frame to logger
        if (properties && properties.tag) {
          console.groupCollapsed('%cVSF%c %c' + properties.tag +'%c ' + message,
          bgColorStyle('red'), 'color: inherit', bgColorStyle('gray'), 'color: red')
        } else {
          console.groupCollapsed('%cVSF%c ' + message,
          bgColorStyle('red'), 'color: inherit')
        }
        if (trace.length > 1) {
          console.log('%cSource:%c ' + 'webpack:///.'+trace[1].fileName.substring(10) + ':' + trace[1].lineNumber, 'font-weight: bold', 'font-weight: normal')
          console.log('%cStack trace:', 'font-weight: bold', trace)
        }
        if (properties && properties.context) {
          console.log('%c' + properties.context.label + ' ', 'font-weight: bold', properties.context.value)
        }
        console.groupEnd()
      })
    }
  }
}

export const Logger = new VueStorefrontLogger()
