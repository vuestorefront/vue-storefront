export function corePage (path) {
  return require('core_pages/' + path + '.vue') // using webpack path alias  - core_pages = src/pages
}

export function coreComponent (path) {
  return require('core_components/' + path + '.vue') // using webpack path alias  - core_pages = src/components
}

export function registerTheme (themeName, app, routes) {
  let themeEntryPoint = require('core_themes/' + themeName + '/index.js')
  if (themeEntryPoint != null && themeEntryPoint.hasOwnProperty('default')) {
    themeEntryPoint.default(app, routes) // register theme
  } else {
    throw new Error('Wrong theme name: ' + themeName)
  }
}
