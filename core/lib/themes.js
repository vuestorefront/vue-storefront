export function registerTheme (themeName, app, routes, store, config, ssrContext) {
  let themeEntryPoint = require('theme/index.js')
  if (themeEntryPoint != null && themeEntryPoint.hasOwnProperty('default')) {
    themeEntryPoint.default(app, routes, store, config, ssrContext) // register theme
  } else {
    throw new Error('Wrong theme name: ' + themeName)
  }
}
