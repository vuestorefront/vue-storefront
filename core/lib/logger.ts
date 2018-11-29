let Logger = null;
function log (a) {
  if (typeof window !== 'undefined') {
    return console.log.bind(window.console, '%c' + a, bgColorStyle('orange'))
  } else {
    return (...args) => {}
  }
}
Logger = {
  info : function (message, tag = null, context = null) {
    if (typeof window !== 'undefined') {
      if (tag) {
        let msg ='%cVSF%c %c' + tag +'%c ' + message
        return console.log.bind(window.console, '%cVSF%c %c' + tag +'%c ' + message, bgColorStyle('green'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', { context });
      } else {
        return console.log.bind(window.console, '%cVSF%c ' + message, bgColorStyle('green'), 'font-weight: bold', { context });
      }
    } else {
      return function (a, b) {}
    }
  },
  warn: function (message, tag = null, context = null) {
    if (typeof window !== 'undefined') {
      if (tag) {
        return console.warn.bind(window.console, '%cVSF%c %c' + tag +'%c ' + message, bgColorStyle('orange'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', { context });
      } else {
        return console.warn.bind(window.console, '%cVSF%c ' + message, bgColorStyle('orange'), 'font-weight: bold', { context });
      }
    } else {
      return function (a, b) {}
    }
  },
  error: function (message, tag = null, context = null) {
    if (typeof window !== 'undefined') {
      if (tag) {
        return console.error.bind(window.console, '%cVSF%c %c' + tag +'%c ' + message, bgColorStyle('red'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', { context });
      } else {
        return console.error.bind(window.console, '%cVSF%c ' + message, bgColorStyle('red'), 'font-weight: bold', { context });
      }
    } else {
      return function (a, b) {}
    }
  }
}

const bgColorStyle = (color) => `color: white; background: ${color}; padding: 4px; font-weight: bold; font-size: 0.8em'`

// class VueStorefrontLogger {
//   private mode: string;
//   constructor () {
//     this.mode = process.env.NODE_ENV
//   }
//   /** 
//    * Inform about something that happened in the app (for example client/server/cache itneractions). 
//    * Provide meaningful data into `context` for easier debugging
//    */
//   public info (message: string, properties?:  {
//     tag?: string
//     context?: { label: string, value: any }
//   }) : void {
//     if (this.mode !== 'production' && typeof window !== 'undefined') {
//         if (properties && properties.tag) {
//           console.groupCollapsed('%cVSF%c %c' + properties.tag +'%c ' + message,
//           bgColorStyle('green'), 'color: inherit', bgColorStyle('gray'), 'color: inherit')
//         } else {
//           console.groupCollapsed('%cVSF%c ' + message,
//           bgColorStyle('green'), 'color: inherit')
//         }
//         if (properties && properties.context) {
//           console.log('%c' + properties.context.label + ' ', 'font-weight: bold', properties.context.value)
//         }
//         console.groupEnd()
//     }
//   }

//   /** 
//    * Warn develoeprs about things that may cause some problems 
//    * Provide meaningful data into `context` for easier debugging
//   * */
//   public warn (message: string, properties?:  {
//     tag?: string
//     context?: { label: string, value: any }
//   }) : void {
//     if (this.mode !== 'production' && typeof window !== 'undefined') {
//       if (this.mode !== 'production' && typeof window !== 'undefined') {
//         if (properties && properties.tag) {
//           console.groupCollapsed('%cVSF%c %c' + properties.tag +'%c ' + message,
//           bgColorStyle('green'), 'color: inherit', bgColorStyle('gray'), 'color: inherit')
//         } else {
//           console.groupCollapsed('%cVSF%c ' + message,
//           bgColorStyle('green'), 'color: inherit')
//         }
//         if (properties && properties.context) {
//           console.log('%c' + properties.context.label + ' ', 'font-weight: bold', properties.context.value)
//         }
//         console.groupEnd()
//       }
//     }
//   }
//   public error (message: string, properties?:  {
//     tag?: string
//     context?: { label: string, value: any }
//   }) : void {
//     if (this.mode !== 'production' && typeof window !== 'undefined') {
//       if (this.mode !== 'production' && typeof window !== 'undefined') {
//         if (properties && properties.tag) {
//           console.groupCollapsed('%cVSF%c %c' + properties.tag +'%c ' + message,
//           bgColorStyle('green'), 'color: inherit', bgColorStyle('gray'), 'color: inherit')
//         } else {
//           console.groupCollapsed('%cVSF%c ' + message,
//           bgColorStyle('green'), 'color: inherit')
//         }
//         if (properties && properties.context) {
//           console.log('%c' + properties.context.label + ' ', 'font-weight: bold', properties.context.value)
//         }
//         console.groupEnd()
//     }
//   }
// }

export {Logger, log } 
