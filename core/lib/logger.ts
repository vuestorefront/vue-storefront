
const Logger = {
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

export { Logger } 
