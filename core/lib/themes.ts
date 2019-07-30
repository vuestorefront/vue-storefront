export function registerTheme (themeName, app, routes, store, config, ssrContext) {
  const themeEntryPoint = require('theme/index.ts')
  if (themeEntryPoint != null && themeEntryPoint.initTheme) {
    themeEntryPoint.initTheme(app, routes, store, config, ssrContext) // register theme
  } else {
    throw new Error('Wrong theme name: ' + themeName)
  }
}
