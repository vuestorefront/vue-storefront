import StackTrace from 'stacktrace-js'

class VueStorefrontLogger {
  private mode: string;
  private showStackTrace;
  constructor () {
    this.mode = process.env.NODE_ENV
    this.showStackTrace = false
  }
  
  public info (value, tag?, context?) {
    if (this.mode !== 'production') {
      if (!tag) tag = ''
      StackTrace.get().then(trace => {
        console.log(
          '%cVSF%c %c' + tag +'%c ' + value, 
          'color: white; background: green; padding: 4px; font-weight: bold; font-size: 0.8em', 
          'color: inherit', 'color: white; background: gray; padding: 4px; font-weight: bold; font-size: 0.8em', 
          'color: inherit', 
          context ? context : '', 
          'webpack:///.'+trace[1].fileName.substring(10) + ':' + trace[1].lineNumber, 
          this.showStackTrace ? trace : '')
      })
    }
  }
  public warn (value, tag?, context?) {
    if (this.mode !== 'production') {
      if (!tag) tag = ''
      StackTrace.get().then(trace => {
        console.warn('%cVSF%c %c' + tag +'%c ' + value + ' ', 'color: white; background: orange; padding: 4px; font-weight: bold; font-size: 0.8em', 'color: inherit', 'color: white; background: gray; padding: 4px; font-weight: bold; font-size: 0.8em', 'color: inherit', 'webpack:///.'+trace[1].fileName.substring(10) + ':' + trace[1].lineNumber)
      })
    }
  }
  public error (value, tag?, context?) {
    if (this.mode !== 'production') {
      if (!tag) tag = ''
      StackTrace.get().then(trace => {
        console.error('%cVSF%c %c' + tag +'%c ' + value + ' ', 'color: white; background: red; padding: 4px; font-weight: bold; font-size: 0.8em', 'color: inherit', 'color: white; background: gray; padding: 4px; font-weight: bold; font-size: 0.8em', 'color: inherit', 'webpack:///.'+trace[1].fileName.substring(10) + ':' + trace[1].lineNumber)
      })
    }
  }
}

export const Logger = new VueStorefrontLogger()